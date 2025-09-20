const Supplier = require('../models/Supplier');
const Product = require('../models/Product');

// Helper function để kiểm tra request API
const isApiRequest = (req) => {
    return req.headers['content-type'] === 'application/json' || 
           req.headers['accept'] === 'application/json' ||
           req.originalUrl.startsWith('/api');
};

// Hiển thị danh sách nhà cung cấp
exports.index = async (req, res) => {
    try {
        const suppliers = await Supplier.find().sort({ createdAt: -1 });
        
        if (isApiRequest(req)) {
            return res.json({
                success: true,
                data: suppliers,
                total: suppliers.length
            });
        }
        
        res.render('suppliers/index', { suppliers });
    } catch (error) {
        console.error(error);
        
        if (isApiRequest(req)) {
            return res.status(500).json({
                success: false,
                message: 'Lỗi khi tải danh sách nhà cung cấp',
                error: error.message
            });
        }
        
        res.status(500).render('error', { message: 'Lỗi khi tải danh sách nhà cung cấp' });
    }
};

// Hiển thị form tạo nhà cung cấp mới
exports.create = (req, res) => {
    if (isApiRequest(req)) {
        return res.json({
            success: true,
            message: 'Ready to create supplier',
            fields: ['name', 'address', 'phone']
        });
    }
    
    res.render('suppliers/create');
};

// Lưu nhà cung cấp mới
exports.store = async (req, res) => {
    try {
        const { name, address, phone } = req.body;
        
        const supplier = new Supplier({ name, address, phone });
        await supplier.save();
        
        if (isApiRequest(req)) {
            return res.status(201).json({
                success: true,
                data: supplier,
                message: 'Nhà cung cấp đã được tạo thành công'
            });
        }
        
        res.redirect('/suppliers');
    } catch (error) {
        console.error(error);
        
        if (isApiRequest(req)) {
            return res.status(500).json({
                success: false,
                message: 'Lỗi khi tạo nhà cung cấp',
                error: error.message
            });
        }
        
        res.render('suppliers/create', { 
            error: 'Lỗi khi tạo nhà cung cấp: ' + error.message,
            supplier: req.body 
        });
    }
};

// Hiển thị chi tiết nhà cung cấp
exports.show = async (req, res) => {
    try {
        const supplierOid = req.params.id;
        
        // Lấy thông tin nhà cung cấp
        const supplier = await Supplier.findOne({ oid: supplierOid });
        if (!supplier) {
            if (isApiRequest(req)) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy nhà cung cấp'
                });
            }
            return res.status(404).render('error', { message: 'Không tìm thấy nhà cung cấp' });
        }
        
        // Lấy danh sách sản phẩm của nhà cung cấp này
        const products = await Product.find({ oid_supplier: supplierOid }).sort({ createdAt: -1 });
        
        if (isApiRequest(req)) {
            return res.json({
                success: true,
                data: {
                    supplier,
                    products,
                    productCount: products.length
                }
            });
        }
        
        res.render('suppliers/show', { supplier, products });
    } catch (error) {
        console.error(error);
        
        if (isApiRequest(req)) {
            return res.status(500).json({
                success: false,
                message: 'Lỗi khi tải chi tiết nhà cung cấp',
                error: error.message
            });
        }
        
        res.status(500).render('error', { message: 'Lỗi khi tải chi tiết nhà cung cấp' });
    }
};

// Hiển thị form chỉnh sửa nhà cung cấp
exports.edit = async (req, res) => {
    try {
        const supplier = await Supplier.findOne({ oid: req.params.id });
        if (!supplier) {
            if (isApiRequest(req)) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy nhà cung cấp'
                });
            }
            return res.status(404).render('error', { message: 'Không tìm thấy nhà cung cấp' });
        }
        
        if (isApiRequest(req)) {
            return res.json({
                success: true,
                data: supplier
            });
        }
        
        res.render('suppliers/edit', { supplier });
    } catch (error) {
        console.error(error);
        
        if (isApiRequest(req)) {
            return res.status(500).json({
                success: false,
                message: 'Lỗi khi tải thông tin nhà cung cấp',
                error: error.message
            });
        }
        
        res.status(500).render('error', { message: 'Lỗi khi tải thông tin nhà cung cấp' });
    }
};

// Cập nhật thông tin nhà cung cấp
exports.update = async (req, res) => {
    try {
        const { name, address, phone } = req.body;
        
        const updatedSupplier = await Supplier.findOneAndUpdate(
            { oid: req.params.id }, 
            { name, address, phone },
            { new: true }
        );
        
        if (isApiRequest(req)) {
            return res.json({
                success: true,
                data: updatedSupplier,
                message: 'Nhà cung cấp đã được cập nhật thành công'
            });
        }
        
        res.redirect('/suppliers');
    } catch (error) {
        console.error(error);
        
        if (isApiRequest(req)) {
            return res.status(500).json({
                success: false,
                message: 'Lỗi khi cập nhật nhà cung cấp',
                error: error.message
            });
        }
        
        const supplier = await Supplier.findOne({ oid: req.params.id });
        res.render('suppliers/edit', { 
            error: 'Lỗi khi cập nhật nhà cung cấp: ' + error.message,
            supplier: { ...supplier.toObject(), ...req.body }
        });
    }
};

// Xóa nhà cung cấp
exports.destroy = async (req, res) => {
    try {
        // Kiểm tra xem có sản phẩm nào đang sử dụng nhà cung cấp này không
        const productsCount = await Product.countDocuments({ oid_supplier: req.params.id });
        
        if (productsCount > 0) {
            const message = `Không thể xóa nhà cung cấp này vì đang có ${productsCount} sản phẩm liên kết. Vui lòng xóa các sản phẩm trước.`;
            
            if (isApiRequest(req)) {
                return res.status(400).json({
                    success: false,
                    message: message,
                    productsCount: productsCount
                });
            }
            
            return res.status(400).render('error', { message });
        }
        
        const result = await Supplier.findOneAndDelete({ oid: req.params.id });
        if (!result) {
            if (isApiRequest(req)) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy nhà cung cấp để xóa'
                });
            }
            return res.status(404).render('error', { message: 'Không tìm thấy nhà cung cấp để xóa' });
        }
        
        if (isApiRequest(req)) {
            return res.json({
                success: true,
                message: 'Nhà cung cấp đã được xóa thành công'
            });
        }
        
        res.redirect('/suppliers');
    } catch (error) {
        console.error(error);
        
        if (isApiRequest(req)) {
            return res.status(500).json({
                success: false,
                message: 'Lỗi khi xóa nhà cung cấp',
                error: error.message
            });
        }
        
        res.status(500).render('error', { message: 'Lỗi khi xóa nhà cung cấp' });
    }
};