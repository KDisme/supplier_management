const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

// Helper function để kiểm tra request API
const isApiRequest = (req) => {
    return req.headers['content-type'] === 'application/json' || 
           req.headers['accept'] === 'application/json' ||
           req.originalUrl.startsWith('/api');
};

// Hiển thị danh sách sản phẩm
exports.index = async (req, res) => {
    try {
        // Sử dụng aggregate để join với suppliers
        const products = await Product.aggregate([
            {
                $lookup: {
                    from: 'suppliers',
                    localField: 'oid_supplier',
                    foreignField: 'oid',
                    as: 'supplier'
                }
            },
            {
                $unwind: {
                    path: '$supplier',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $sort: { createdAt: -1 }
            }
        ]);
        
        // Nếu là API request, trả về JSON
        if (isApiRequest(req)) {
            return res.json({
                success: true,
                data: products,
                total: products.length
            });
        }
        
        res.render('products/index', { products });
    } catch (error) {
        console.error(error);
        
        if (isApiRequest(req)) {
            return res.status(500).json({
                success: false,
                message: 'Lỗi khi tải danh sách sản phẩm',
                error: error.message
            });
        }
        
        res.status(500).render('error', { message: 'Lỗi khi tải danh sách sản phẩm' });
    }
};

// Hiển thị chi tiết sản phẩm
exports.show = async (req, res) => {
    try {
        const productOid = req.params.id;
        
        // Sử dụng aggregate để join với supplier
        const products = await Product.aggregate([
            {
                $match: { oid: productOid }
            },
            {
                $lookup: {
                    from: 'suppliers',
                    localField: 'oid_supplier',
                    foreignField: 'oid',
                    as: 'supplier'
                }
            },
            {
                $unwind: {
                    path: '$supplier',
                    preserveNullAndEmptyArrays: true
                }
            }
        ]);
        
        if (products.length === 0) {
            if (isApiRequest(req)) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy sản phẩm'
                });
            }
            return res.status(404).render('error', { message: 'Không tìm thấy sản phẩm' });
        }
        
        const product = products[0];
        
        if (isApiRequest(req)) {
            return res.json({
                success: true,
                data: product
            });
        }
        
        res.render('products/show', { product });
    } catch (error) {
        console.error(error);
        
        if (isApiRequest(req)) {
            return res.status(500).json({
                success: false,
                message: 'Lỗi khi tải chi tiết sản phẩm',
                error: error.message
            });
        }
        
        res.status(500).render('error', { message: 'Lỗi khi tải chi tiết sản phẩm' });
    }
};

// Hiển thị form tạo sản phẩm mới hoặc trả về danh sách suppliers cho API
exports.create = async (req, res) => {
    try {
        const suppliers = await Supplier.find().sort({ name: 1 });
        
        if (isApiRequest(req)) {
            return res.json({
                success: true,
                data: suppliers,
                message: 'Danh sách nhà cung cấp để tạo sản phẩm'
            });
        }
        
        res.render('products/create', { suppliers });
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

// Lưu sản phẩm mới
exports.store = async (req, res) => {
    try {
        const { name, price, quantity, oid_supplier } = req.body;
        
        // Kiểm tra supplier tồn tại
        const supplier = await Supplier.findOne({ oid: oid_supplier });
        if (!supplier) {
            if (isApiRequest(req)) {
                return res.status(400).json({
                    success: false,
                    message: 'Nhà cung cấp không tồn tại'
                });
            }
            
            const suppliers = await Supplier.find().sort({ name: 1 });
            return res.render('products/create', { 
                error: 'Nhà cung cấp không tồn tại',
                product: req.body,
                suppliers 
            });
        }
        
        const product = new Product({ 
            name, 
            price: parseFloat(price), 
            quantity: parseInt(quantity) || 0,
            oid_supplier 
        });
        
        await product.save();
        
        if (isApiRequest(req)) {
            return res.status(201).json({
                success: true,
                data: product,
                message: 'Sản phẩm đã được tạo thành công'
            });
        }
        
        res.redirect('/products');
    } catch (error) {
        console.error(error);
        
        if (isApiRequest(req)) {
            return res.status(500).json({
                success: false,
                message: 'Lỗi khi tạo sản phẩm',
                error: error.message
            });
        }
        
        const suppliers = await Supplier.find().sort({ name: 1 });
        res.render('products/create', { 
            error: 'Lỗi khi tạo sản phẩm: ' + error.message,
            product: req.body,
            suppliers 
        });
    }
};

// Hiển thị form chỉnh sửa sản phẩm hoặc trả về thông tin sản phẩm cho API
exports.edit = async (req, res) => {
    try {
        const product = await Product.findOne({ oid: req.params.id });
        if (!product) {
            if (isApiRequest(req)) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy sản phẩm'
                });
            }
            return res.status(404).render('error', { message: 'Không tìm thấy sản phẩm' });
        }

        // Lấy thông tin supplier
        const supplier = await Supplier.findOne({ oid: product.oid_supplier });
        const suppliers = await Supplier.find().sort({ name: 1 });
        
        if (isApiRequest(req)) {
            return res.json({
                success: true,
                data: {
                    product: { ...product.toObject(), supplier },
                    suppliers
                }
            });
        }
        
        res.render('products/edit', { 
            product: { ...product.toObject(), supplier }, 
            suppliers 
        });
    } catch (error) {
        console.error(error);
        
        if (isApiRequest(req)) {
            return res.status(500).json({
                success: false,
                message: 'Lỗi khi tải thông tin sản phẩm',
                error: error.message
            });
        }
        
        res.status(500).render('error', { message: 'Lỗi khi tải thông tin sản phẩm' });
    }
};

// Cập nhật thông tin sản phẩm
exports.update = async (req, res) => {
    try {
        const { name, price, quantity, oid_supplier } = req.body;
        
        // Kiểm tra supplier tồn tại
        const supplier = await Supplier.findOne({ oid: oid_supplier });
        if (!supplier) {
            if (isApiRequest(req)) {
                return res.status(400).json({
                    success: false,
                    message: 'Nhà cung cấp không tồn tại'
                });
            }
            
            const product = await Product.findOne({ oid: req.params.id });
            const suppliers = await Supplier.find().sort({ name: 1 });
            return res.render('products/edit', { 
                error: 'Nhà cung cấp không tồn tại',
                product: { ...product.toObject(), ...req.body },
                suppliers
            });
        }
        
        const updatedProduct = await Product.findOneAndUpdate(
            { oid: req.params.id }, 
            { 
                name, 
                price: parseFloat(price), 
                quantity: parseInt(quantity) || 0,
                oid_supplier 
            },
            { new: true }
        );
        
        if (isApiRequest(req)) {
            return res.json({
                success: true,
                data: updatedProduct,
                message: 'Sản phẩm đã được cập nhật thành công'
            });
        }
        
        res.redirect('/products');
    } catch (error) {
        console.error(error);
        
        if (isApiRequest(req)) {
            return res.status(500).json({
                success: false,
                message: 'Lỗi khi cập nhật sản phẩm',
                error: error.message
            });
        }
        
        const product = await Product.findOne({ oid: req.params.id });
        const suppliers = await Supplier.find().sort({ name: 1 });
        res.render('products/edit', { 
            error: 'Lỗi khi cập nhật sản phẩm: ' + error.message,
            product: { ...product.toObject(), ...req.body },
            suppliers
        });
    }
};

// Xóa sản phẩm
exports.destroy = async (req, res) => {
    try {
        const result = await Product.findOneAndDelete({ oid: req.params.id });
        if (!result) {
            if (isApiRequest(req)) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy sản phẩm để xóa'
                });
            }
            return res.status(404).render('error', { message: 'Không tìm thấy sản phẩm để xóa' });
        }
        
        if (isApiRequest(req)) {
            return res.json({
                success: true,
                message: 'Sản phẩm đã được xóa thành công'
            });
        }
        
        res.redirect('/products');
    } catch (error) {
        console.error(error);
        
        if (isApiRequest(req)) {
            return res.status(500).json({
                success: false,
                message: 'Lỗi khi xóa sản phẩm',
                error: error.message
            });
        }
        
        res.status(500).render('error', { message: 'Lỗi khi xóa sản phẩm' });
    }
};