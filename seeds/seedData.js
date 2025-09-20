const mongoose = require('mongoose');
const Supplier = require('../models/Supplier');
const Product = require('../models/Product');

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/supplier_management', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Kết nối MongoDB thành công');
    seedData();
}).catch(err => {
    console.error('Lỗi kết nối MongoDB:', err);
});

// Dữ liệu mẫu cho nhà cung cấp
const suppliersData = [
    {
        supplierID: 'SUP001',
        name: 'Công ty TNHH Điện tử Việt Nam',
        address: '123 Đường Nguyễn Văn Cừ, Quận 5, TP.HCM',
        phone: '0283-123-4567'
    },
    {
        supplierID: 'SUP002',
        name: 'Tập đoàn Thời trang An Phước',
        address: '456 Đường Lê Lợi, Quận 1, TP.HCM',
        phone: '0283-234-5678'
    },
    {
        supplierID: 'SUP003',
        name: 'Công ty Cổ phần Gia dụng Hòa Bình',
        address: '789 Đường Trần Hưng Đạo, Quận 1, TP.HCM',
        phone: '0283-345-6789'
    },
    {
        supplierID: 'SUP004',
        name: 'Công ty TNHH Thực phẩm Organic',
        address: '321 Đường Võ Văn Tần, Quận 3, TP.HCM',
        phone: '0283-456-7890'
    },
    {
        supplierID: 'SUP005',
        name: 'Tổng công ty Sách và Thiết bị giáo dục',
        address: '654 Đường Điện Biên Phủ, Quận Bình Thạnh, TP.HCM',
        phone: '0283-567-8901'
    },
    {
        supplierID: 'SUP006',
        name: 'Công ty TNHH Mỹ phẩm Thiên Nhiên',
        address: '987 Đường Nguyễn Trãi, Quận 5, TP.HCM',
        phone: '0283-678-9012'
    },
    {
        supplierID: 'SUP007',
        name: 'Công ty Cổ phần Đồ chơi Trẻ em',
        address: '147 Đường Pasteur, Quận 1, TP.HCM',
        phone: '0283-789-0123'
    },
    {
        supplierID: 'SUP008',
        name: 'Tập đoàn Nội thất Hiện đại',
        address: '258 Đường Cách Mạng Tháng 8, Quận 10, TP.HCM',
        phone: '0283-890-1234'
    }
];

// Dữ liệu mẫu cho sản phẩm (sẽ được tạo sau khi có suppliers)
const productsData = [
    {
        name: 'iPhone 15 Pro Max',
        description: 'Điện thoại thông minh cao cấp với chip A17 Pro, camera 48MP và màn hình ProMotion 6.7 inch',
        price: 29990000,
        category: 'Điện tử'
    },
    {
        name: 'Samsung Galaxy S24 Ultra',
        description: 'Smartphone Android flagship với S Pen, camera zoom 100x và hiệu năng mạnh mẽ',
        price: 26990000,
        category: 'Điện tử'
    },
    {
        name: 'MacBook Air M3',
        description: 'Laptop siêu mỏng với chip M3, màn hình Liquid Retina 13.6 inch và thời lượng pin 18 giờ',
        price: 35990000,
        category: 'Điện tử'
    },
    {
        name: 'Áo Polo Nam Cao Cấp',
        description: 'Áo polo cotton 100% với thiết kế thanh lịch, phù hợp cho môi trường công sở',
        price: 450000,
        category: 'Thời trang'
    },
    {
        name: 'Váy Dạ Hội Nữ',
        description: 'Váy dạ hội sang trọng với chất liệu lụa cao cấp, thiết kế tinh tế',
        price: 1250000,
        category: 'Thời trang'
    },
    {
        name: 'Nồi Cơm Điện Tử Sharp 1.8L',
        description: 'Nồi cơm điện tử thông minh với 8 chế độ nấu, lòng nồi chống dính cao cấp',
        price: 2890000,
        category: 'Gia dụng'
    },
    {
        name: 'Máy Lọc Nước RO 9 Cấp',
        description: 'Hệ thống lọc nước RO 9 cấp với công nghệ lọc tiên tiến, đảm bảo nước sạch',
        price: 5990000,
        category: 'Gia dụng'
    },
    {
        name: 'Tủ Lạnh Inverter 345L',
        description: 'Tủ lạnh Inverter tiết kiệm điện với công nghệ làm lạnh đa chiều',
        price: 12990000,
        category: 'Gia dụng'
    },
    {
        name: 'Gạo Jasmine Hữu Cơ 5kg',
        description: 'Gạo Jasmine hữu cơ cao cấp, không sử dụng hóa chất, thơm ngon tự nhiên',
        price: 185000,
        category: 'Thực phẩm'
    },
    {
        name: 'Mật Ong Rừng Nguyên Chất 500ml',
        description: 'Mật ong rừng nguyên chất 100%, không pha trộn, giàu dinh dưỡng',
        price: 320000,
        category: 'Thực phẩm'
    },
    {
        name: 'Dầu Olive Extra Virgin 500ml',
        description: 'Dầu olive nguyên chất từ Ý, ép lạnh, giàu vitamin E và chất chống oxy hóa',
        price: 450000,
        category: 'Thực phẩm'
    },
    {
        name: 'Sách Lập Trình JavaScript',
        description: 'Giáo trình lập trình JavaScript từ cơ bản đến nâng cao, bao gồm ES6+ và frameworks',
        price: 280000,
        category: 'Sách'
    },
    {
        name: 'Bộ Sách Toán Học Lớp 12',
        description: 'Bộ sách giáo khoa và sách bài tập Toán học lớp 12, chương trình mới',
        price: 150000,
        category: 'Sách'
    },
    {
        name: 'Kem Dưỡng Da Mặt Vitamin C',
        description: 'Kem dưỡng da với vitamin C và collagen, giúp trắng sáng và chống lão hóa',
        price: 680000,
        category: 'Mỹ phẩm'
    },
    {
        name: 'Son Môi Lì Cao Cấp',
        description: 'Son môi lì với công thức dưỡng ẩm, màu sắc bền đẹp suốt 8 giờ',
        price: 350000,
        category: 'Mỹ phẩm'
    },
    {
        name: 'Serum Vitamin E Dưỡng Tóc',
        description: 'Serum dưỡng tóc với vitamin E và dầu argan, giúp tóc mềm mượt và bóng khỏe',
        price: 420000,
        category: 'Mỹ phẩm'
    },
    {
        name: 'Robot Lập Trình Cho Trẻ Em',
        description: 'Robot giáo dục STEM giúp trẻ học lập trình cơ bản qua trò chơi vui nhộn',
        price: 1890000,
        category: 'Đồ chơi'
    },
    {
        name: 'Bộ Lego Architecture Paris',
        description: 'Bộ Lego mô hình kiến trúc Paris với 694 chi tiết, phù hợp cho trẻ từ 12 tuổi',
        price: 2350000,
        category: 'Đồ chơi'
    },
    {
        name: 'Sofa Góc Hiện Đại 3+2',
        description: 'Bộ sofa góc bọc da cao cấp, thiết kế hiện đại, thoải mái cho phòng khách',
        price: 25900000,
        category: 'Nội thất'
    },
    {
        name: 'Bàn Làm Việc Gỗ Sồi',
        description: 'Bàn làm việc gỗ sồi tự nhiên với ngăn kéo tiện lợi, thiết kế tối giản',
        price: 3890000,
        category: 'Nội thất'
    }
];

async function seedData() {
    try {
        // Xóa dữ liệu cũ
        await Supplier.deleteMany({});
        await Product.deleteMany({});
        console.log('Đã xóa dữ liệu cũ');

        // Thêm suppliers
        const suppliers = await Supplier.create(suppliersData);
        console.log(`Đã thêm ${suppliers.length} nhà cung cấp`);

        // Tạo products với supplier ngẫu nhiên
        const productsWithSupplier = productsData.map(product => ({
            ...product,
            supplier: suppliers[Math.floor(Math.random() * suppliers.length)]._id
        }));

        const products = await Product.create(productsWithSupplier);
        console.log(`Đã thêm ${products.length} sản phẩm`);

        console.log('\n=== SEED DATA HOÀN THÀNH ===');
        console.log(`✅ Tổng ${suppliers.length} nhà cung cấp`);
        console.log(`✅ Tổng ${products.length} sản phẩm`);
        console.log('✅ Dữ liệu đã được thêm thành công!');

        process.exit(0);
    } catch (error) {
        console.error('Lỗi khi seed dữ liệu:', error);
        process.exit(1);
    }
}