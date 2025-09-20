const mongoose = require('mongoose');

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/supplier_management', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Kết nối MongoDB thành công');
    dropIndexes();
}).catch(err => {
    console.error('Lỗi kết nối MongoDB:', err);
});

async function dropIndexes() {
    try {
        console.log('Bắt đầu xóa indexes cũ...');

        // Xóa tất cả indexes (trừ _id default)
        const suppliersCollection = mongoose.connection.db.collection('suppliers');
        const productsCollection = mongoose.connection.db.collection('products');

        try {
            await suppliersCollection.dropIndexes();
            console.log('Đã xóa indexes của suppliers');
        } catch (err) {
            console.log('Không có indexes để xóa cho suppliers');
        }

        try {
            await productsCollection.dropIndexes();
            console.log('Đã xóa indexes của products');
        } catch (err) {
            console.log('Không có indexes để xóa cho products');
        }

        // Xóa tất cả dữ liệu
        await suppliersCollection.deleteMany({});
        await productsCollection.deleteMany({});
        console.log('Đã xóa tất cả dữ liệu');

        console.log('Cleanup hoàn thành!');

    } catch (error) {
        console.error('Lỗi cleanup:', error);
    } finally {
        await mongoose.connection.close();
        console.log('Đã đóng kết nối database');
    }
}