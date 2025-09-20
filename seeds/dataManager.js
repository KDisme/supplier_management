const mongoose = require('mongoose');
const Supplier = require('../models/Supplier');
const Product = require('../models/Product');

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/supplier_management', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Kết nối MongoDB thành công');
}).catch(err => {
    console.error('Lỗi kết nối MongoDB:', err);
});

// Function để thêm nhà cung cấp
async function addSupplier(supplierData) {
    try {
        const supplier = new Supplier(supplierData);
        await supplier.save();
        console.log(`✅ Đã thêm nhà cung cấp: ${supplier.name}`);
        return supplier;
    } catch (error) {
        console.error(`❌ Lỗi khi thêm nhà cung cấp:`, error.message);
        return null;
    }
}

// Function để thêm sản phẩm
async function addProduct(productData) {
    try {
        const product = new Product(productData);
        await product.save();
        console.log(`✅ Đã thêm sản phẩm: ${product.name}`);
        return product;
    } catch (error) {
        console.error(`❌ Lỗi khi thêm sản phẩm:`, error.message);
        return null;
    }
}

// Function để lấy danh sách nhà cung cấp
async function getSuppliers() {
    try {
        const suppliers = await Supplier.find().select('_id name supplierID');
        return suppliers;
    } catch (error) {
        console.error('❌ Lỗi khi lấy danh sách nhà cung cấp:', error.message);
        return [];
    }
}

// Function để hiển thị thống kê
async function showStats() {
    try {
        const supplierCount = await Supplier.countDocuments();
        const productCount = await Product.countDocuments();
        
        console.log('\n📊 THỐNG KÊ DỮ LIỆU:');
        console.log(`🏢 Tổng số nhà cung cấp: ${supplierCount}`);
        console.log(`📦 Tổng số sản phẩm: ${productCount}`);
        
        // Thống kê sản phẩm theo danh mục
        const categoryStats = await Product.aggregate([
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);
        
        console.log('\n📈 THỐNG KÊ THEO DANH MỤC:');
        categoryStats.forEach(stat => {
            console.log(`   ${stat._id}: ${stat.count} sản phẩm`);
        });
        
    } catch (error) {
        console.error('❌ Lỗi khi lấy thống kê:', error.message);
    }
}

// Function để xóa tất cả dữ liệu
async function clearAllData() {
    try {
        await Supplier.deleteMany({});
        await Product.deleteMany({});
        console.log('🗑️ Đã xóa toàn bộ dữ liệu');
    } catch (error) {
        console.error('❌ Lỗi khi xóa dữ liệu:', error.message);
    }
}

// Menu tương tác
async function showMenu() {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    function question(prompt) {
        return new Promise((resolve) => {
            rl.question(prompt, resolve);
        });
    }

    console.log('\n🎯 QUẢN LÝ DỮ LIỆU - MENU TƯƠNG TÁC');
    console.log('=====================================');
    console.log('1. Thêm nhà cung cấp mới');
    console.log('2. Thêm sản phẩm mới');
    console.log('3. Xem thống kê');
    console.log('4. Xóa toàn bộ dữ liệu');
    console.log('5. Thoát');
    console.log('=====================================');

    const choice = await question('Chọn chức năng (1-5): ');

    switch (choice) {
        case '1':
            console.log('\n📝 THÊM NHÀ CUNG CẤP MỚI:');
            const supplierID = await question('Mã nhà cung cấp: ');
            const name = await question('Tên nhà cung cấp: ');
            const address = await question('Địa chỉ: ');
            const phone = await question('Số điện thoại: ');
            
            await addSupplier({ supplierID, name, address, phone });
            break;

        case '2':
            console.log('\n📦 THÊM SẢN PHẨM MỚI:');
            const suppliers = await getSuppliers();
            
            if (suppliers.length === 0) {
                console.log('❌ Chưa có nhà cung cấp nào. Vui lòng thêm nhà cung cấp trước.');
                break;
            }

            console.log('\nDanh sách nhà cung cấp:');
            suppliers.forEach((sup, index) => {
                console.log(`${index + 1}. ${sup.name} (${sup.supplierID})`);
            });

            const productName = await question('Tên sản phẩm: ');
            const description = await question('Mô tả: ');
            const price = await question('Giá: ');
            const category = await question('Danh mục: ');
            const supplierIndex = await question(`Chọn nhà cung cấp (1-${suppliers.length}): `);
            
            const selectedSupplier = suppliers[parseInt(supplierIndex) - 1];
            if (selectedSupplier) {
                await addProduct({
                    name: productName,
                    description,
                    price: parseInt(price),
                    category,
                    supplier: selectedSupplier._id
                });
            } else {
                console.log('❌ Nhà cung cấp không hợp lệ');
            }
            break;

        case '3':
            await showStats();
            break;

        case '4':
            const confirm = await question('⚠️ Bạn có chắc muốn xóa toàn bộ dữ liệu? (y/N): ');
            if (confirm.toLowerCase() === 'y') {
                await clearAllData();
            } else {
                console.log('❌ Đã hủy thao tác xóa');
            }
            break;

        case '5':
            console.log('👋 Tạm biệt!');
            rl.close();
            process.exit(0);
            break;

        default:
            console.log('❌ Lựa chọn không hợp lệ');
            break;
    }

    rl.close();
    
    // Tiếp tục hiển thị menu
    setTimeout(showMenu, 1000);
}

// Khởi chạy menu nếu file được chạy trực tiếp
if (require.main === module) {
    console.log('🚀 Khởi động công cụ quản lý dữ liệu...');
    setTimeout(showMenu, 1000);
}

// Export functions để sử dụng ở nơi khác
module.exports = {
    addSupplier,
    addProduct,
    getSuppliers,
    showStats,
    clearAllData
};