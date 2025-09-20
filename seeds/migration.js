const mongoose = require('mongoose');

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/supplier_management', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Kết nối MongoDB thành công');
    migrationScript();
}).catch(err => {
    console.error('Lỗi kết nối MongoDB:', err);
});

async function migrationScript() {
    try {
        console.log('Bắt đầu migration schema...');

        // Xóa tất cả dữ liệu cũ
        await mongoose.connection.db.collection('products').deleteMany({});
        await mongoose.connection.db.collection('suppliers').deleteMany({});
        
        console.log('Đã xóa dữ liệu cũ');

        // Tạo dữ liệu suppliers mới
        const suppliers = [
            {
                oid: new mongoose.Types.ObjectId().toString(),
                name: 'Công ty TNHH ABC Technology',
                address: '123 Nguyễn Du, Quận 1, TP.HCM',
                phone: '0901-234-567',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                oid: new mongoose.Types.ObjectId().toString(),
                name: 'Công ty CP XYZ Electronics',
                address: '456 Lê Lợi, Quận 3, TP.HCM',
                phone: '0912-345-678',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                oid: new mongoose.Types.ObjectId().toString(),
                name: 'Nhà phân phối DEF Hardware',
                address: '789 Trần Hưng Đạo, Quận 5, TP.HCM',
                phone: '0923-456-789',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                oid: new mongoose.Types.ObjectId().toString(),
                name: 'Tập đoàn GHI Solutions',
                address: '321 Võ Văn Tần, Quận 3, TP.HCM',
                phone: '0934-567-890',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                oid: new mongoose.Types.ObjectId().toString(),
                name: 'Công ty JKL Import Export',
                address: '654 Điện Biên Phủ, Quận Bình Thạnh, TP.HCM',
                phone: '0945-678-901',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ];

        await mongoose.connection.db.collection('suppliers').insertMany(suppliers);
        console.log(`Đã tạo ${suppliers.length} nhà cung cấp`);

        // Tạo dữ liệu products mới
        const products = [
            {
                oid: new mongoose.Types.ObjectId().toString(),
                name: 'Laptop Dell Inspiron 15',
                price: 15000000,
                quantity: 25,
                oid_supplier: suppliers[0].oid,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                oid: new mongoose.Types.ObjectId().toString(),
                name: 'iPhone 15 Pro Max',
                price: 32000000,
                quantity: 12,
                oid_supplier: suppliers[0].oid,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                oid: new mongoose.Types.ObjectId().toString(),
                name: 'Samsung Galaxy S24 Ultra',
                price: 28000000,
                quantity: 18,
                oid_supplier: suppliers[1].oid,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                oid: new mongoose.Types.ObjectId().toString(),
                name: 'MacBook Air M3',
                price: 35000000,
                quantity: 8,
                oid_supplier: suppliers[0].oid,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                oid: new mongoose.Types.ObjectId().toString(),
                name: 'iPad Pro 12.9 inch',
                price: 25000000,
                quantity: 15,
                oid_supplier: suppliers[0].oid,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                oid: new mongoose.Types.ObjectId().toString(),
                name: 'Canon EOS R5',
                price: 85000000,
                quantity: 5,
                oid_supplier: suppliers[2].oid,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                oid: new mongoose.Types.ObjectId().toString(),
                name: 'Sony WH-1000XM5',
                price: 8500000,
                quantity: 30,
                oid_supplier: suppliers[1].oid,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                oid: new mongoose.Types.ObjectId().toString(),
                name: 'LG OLED TV 55 inch',
                price: 45000000,
                quantity: 10,
                oid_supplier: suppliers[3].oid,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                oid: new mongoose.Types.ObjectId().toString(),
                name: 'Nintendo Switch OLED',
                price: 9500000,
                quantity: 22,
                oid_supplier: suppliers[4].oid,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                oid: new mongoose.Types.ObjectId().toString(),
                name: 'AirPods Pro 2',
                price: 6500000,
                quantity: 35,
                oid_supplier: suppliers[0].oid,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                oid: new mongoose.Types.ObjectId().toString(),
                name: 'Surface Pro 9',
                price: 28000000,
                quantity: 14,
                oid_supplier: suppliers[2].oid,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                oid: new mongoose.Types.ObjectId().toString(),
                name: 'Xiaomi Redmi Note 13',
                price: 5500000,
                quantity: 50,
                oid_supplier: suppliers[4].oid,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                oid: new mongoose.Types.ObjectId().toString(),
                name: 'Gaming Chair Corsair',
                price: 12000000,
                quantity: 8,
                oid_supplier: suppliers[3].oid,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                oid: new mongoose.Types.ObjectId().toString(),
                name: 'Mechanical Keyboard Logitech',
                price: 3500000,
                quantity: 40,
                oid_supplier: suppliers[2].oid,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                oid: new mongoose.Types.ObjectId().toString(),
                name: 'Gaming Mouse Razer',
                price: 2800000,
                quantity: 45,
                oid_supplier: suppliers[2].oid,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ];

        await mongoose.connection.db.collection('products').insertMany(products);
        console.log(`Đã tạo ${products.length} sản phẩm`);

        console.log('Migration hoàn thành!');
        console.log('Thống kê:');
        console.log(`- Nhà cung cấp: ${suppliers.length}`);
        console.log(`- Sản phẩm: ${products.length}`);
        console.log(`- Tổng giá trị kho: ${products.reduce((sum, p) => sum + (p.price * p.quantity), 0).toLocaleString('vi-VN')} VNĐ`);

    } catch (error) {
        console.error('Lỗi migration:', error);
    } finally {
        await mongoose.connection.close();
        console.log('Đã đóng kết nối database');
    }
}