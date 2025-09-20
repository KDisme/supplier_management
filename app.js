const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

const app = express();

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/supplier_management').then(() => {
    console.log('Kết nối MongoDB thành công');
}).catch(err => {
    console.error('Lỗi kết nối MongoDB:', err);
});

// Cấu hình view engine
app.use(expressLayouts);
app.set('layout', 'layout');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

// CORS middleware cho API
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

// Routes
const supplierRoutes = require('./routes/supplierRoutes');
const productRoutes = require('./routes/productRoutes');

// API Routes với prefix /api
app.use('/api/suppliers', supplierRoutes);
app.use('/api/products', productRoutes);

// Web Routes (giao diện)
app.use('/suppliers', supplierRoutes);
app.use('/products', productRoutes);

// Route trang chủ
app.get('/', (req, res) => {
    res.redirect('/suppliers');
});

// Xử lý 404
app.use((req, res) => {
    // Nếu là API request, trả về JSON
    if (req.originalUrl.startsWith('/api') || 
        req.headers['content-type'] === 'application/json' || 
        req.headers['accept'] === 'application/json') {
        return res.status(404).json({
            success: false,
            message: 'API endpoint không tìm thấy'
        });
    }
    
    res.status(404).render('error', { message: 'Trang không tìm thấy' });
});

// Xử lý lỗi
app.use((err, req, res, next) => {
    console.error(err.stack);
    
    // Nếu là API request, trả về JSON
    if (req.originalUrl.startsWith('/api') || 
        req.headers['content-type'] === 'application/json' || 
        req.headers['accept'] === 'application/json') {
        return res.status(500).json({
            success: false,
            message: 'Đã xảy ra lỗi server',
            error: err.message
        });
    }
    
    res.status(500).render('error', { message: 'Đã xảy ra lỗi server' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server đang chạy trên port ${PORT}`);
    console.log(`Truy cập: http://localhost:${PORT}`);
});