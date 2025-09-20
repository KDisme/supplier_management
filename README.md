# 🏢 Hệ thống Quản lý Sản phẩm và Nhà cung cấp

Một ứng dụng web được xây dựng bằng Node.js, Express.js và MongoDB để quản lý sản phẩm và nhà cung cấp với giao diện Bootstrap hiện đại.

## 📋 Mục lục

- [Tính năng](#-tính-năng)
- [Công nghệ sử dụng](#-công-nghệ-sử-dụng)
- [Cài đặt](#-cài-đặt)
- [Sử dụng](#-sử-dụng)
- [API Documentation](#-api-documentation)
- [Cấu trúc dự án](#-cấu-trúc-dự-án)
- [Screenshots](#-screenshots)
- [Đóng góp](#-đóng-góp)

## ✨ Tính năng

### 🎯 Quản lý Sản phẩm
- ✅ Thêm, sửa, xóa, xem chi tiết sản phẩm
- ✅ Liên kết sản phẩm với nhà cung cấp
- ✅ Quản lý số lượng tồn kho
- ✅ Hiển thị giá tiền định dạng VND
- ✅ Tìm kiếm và lọc sản phẩm

### 🏭 Quản lý Nhà cung cấp
- ✅ Thêm, sửa, xóa, xem chi tiết nhà cung cấp
- ✅ Xem danh sách sản phẩm của từng nhà cung cấp
- ✅ Thống kê tổng quan (số sản phẩm, giá trị tồn kho)
- ✅ Kiểm tra ràng buộc trước khi xóa

### 🎨 Giao diện người dùng
- ✅ Responsive design với Bootstrap 5
- ✅ Icons Font Awesome
- ✅ Dark/Light theme cho bảng
- ✅ Breadcrumb navigation
- ✅ Toast notifications

### 🔌 API Support
- ✅ RESTful API cho cả Products và Suppliers
- ✅ Hỗ trợ cả Web UI và API endpoints
- ✅ CORS enabled
- ✅ JSON responses với status codes chuẩn

## 🛠 Công nghệ sử dụng

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM cho MongoDB

### Frontend
- **EJS** - Template engine
- **Bootstrap 5.3.2** - CSS framework
- **Font Awesome** - Icons
- **Express-EJS-Layouts** - Layout management

### Tools & Libraries
- **body-parser** - Parse request bodies
- **method-override** - HTTP method override
- **uuid** - Generate unique IDs

## 🚀 Cài đặt

### Yêu cầu hệ thống
- Node.js (>= 14.x)
- MongoDB (>= 4.x)
- npm hoặc yarn

### Bước 1: Clone repository
```bash
git clone https://github.com/[your-username]/supplier-product-management.git
cd supplier-product-management
```

### Bước 2: Cài đặt dependencies
```bash
npm install
```

### Bước 3: Khởi động MongoDB
```bash
# Windows
net start MongoDB

# MacOS/Linux
sudo systemctl start mongod
```

### Bước 4: Seed dữ liệu mẫu (tùy chọn)
```bash
node seeds/migration.js
```

### Bước 5: Khởi động ứng dụng
```bash
npm start
```

Ứng dụng sẽ chạy tại: `http://localhost:3000`

## 📖 Sử dụng

### Web Interface
1. Truy cập `http://localhost:3000`
2. Sử dụng navigation để di chuyển giữa Sản phẩm và Nhà cung cấp
3. Các chức năng CRUD có sẵn thông qua giao diện web

### API Endpoints

#### Suppliers API
```
GET    /api/suppliers          # Lấy danh sách nhà cung cấp
POST   /api/suppliers          # Tạo nhà cung cấp mới
GET    /api/suppliers/:id      # Xem chi tiết nhà cung cấp
PUT    /api/suppliers/:id      # Cập nhật nhà cung cấp
DELETE /api/suppliers/:id      # Xóa nhà cung cấp
```

#### Products API
```
GET    /api/products           # Lấy danh sách sản phẩm
POST   /api/products           # Tạo sản phẩm mới
GET    /api/products/:id       # Xem chi tiết sản phẩm
PUT    /api/products/:id       # Cập nhật sản phẩm
DELETE /api/products/:id       # Xóa sản phẩm
```

## 🔌 API Documentation

### Tạo Supplier mới
```http
POST /api/suppliers
Content-Type: application/json

{
  "name": "Công ty ABC",
  "address": "123 Đường XYZ, TP.HCM",
  "phone": "0901234567"
}
```

### Tạo Product mới
```http
POST /api/products
Content-Type: application/json

{
  "name": "Laptop Dell XPS 13",
  "price": 25000000,
  "quantity": 10,
  "oid_supplier": "SUPPLIER_OID_HERE"
}
```

### Response Format
```json
{
  "success": true,
  "data": {...},
  "message": "Thành công"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Lỗi mô tả",
  "error": "Chi tiết lỗi"
}
```

## 📁 Cấu trúc dự án

```
supplier-product-management/
├── 📁 controllers/          # Controllers xử lý logic
│   ├── productController.js
│   └── supplierController.js
├── 📁 models/              # Mongoose models
│   ├── Product.js
│   └── Supplier.js
├── 📁 routes/              # Express routes
│   ├── productRoutes.js
│   └── supplierRoutes.js
├── 📁 views/               # EJS templates
│   ├── 📁 products/
│   ├── 📁 suppliers/
│   ├── layout.ejs
│   └── error.ejs
├── 📁 public/              # Static files
│   └── 📁 css/
├── 📁 seeds/               # Database seeders
│   ├── migration.js
│   └── cleanup.js
├── app.js                  # Main application file
├── package.json
└── README.md
```

## 🎨 Screenshots

### Dashboard
![Dashboard](./screenshots/dashboard.png)

### Product List
![Product List](./screenshots/products.png)

### Product Detail
![Product Detail](./screenshots/product-detail.png)

### Supplier Detail
![Supplier Detail](./screenshots/supplier-detail.png)

## 🧪 Testing với Postman

### Import Collection
1. Mở Postman
2. Import file `postman_collection.json` (sẽ tạo)
3. Set base URL: `http://localhost:3000`

### Test Scenarios
1. **Get all suppliers**: `GET /api/suppliers`
2. **Create supplier**: `POST /api/suppliers`
3. **Get supplier detail**: `GET /api/suppliers/:id`
4. **Update supplier**: `PUT /api/suppliers/:id`
5. **Delete supplier**: `DELETE /api/suppliers/:id`

## 🚀 Deployment

### Heroku
```bash
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Set MongoDB URI
heroku config:set MONGODB_URI=your_mongodb_connection_string

# Deploy
git push heroku main
```

### Environment Variables
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/supplier_management
NODE_ENV=production
```

## 🤝 Đóng góp

1. Fork dự án
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 👨‍💻 Author

**[Tên của bạn]**
- GitHub: [@your-username](https://github.com/your-username)
- Email: your-email@example.com

## 🙏 Acknowledgments

- [Bootstrap](https://getbootstrap.com/) - CSS Framework
- [Font Awesome](https://fontawesome.com/) - Icons
- [MongoDB](https://www.mongodb.com/) - Database
- [Express.js](https://expressjs.com/) - Web Framework

---

⭐ **Nếu dự án này hữu ích, hãy cho một star nhé!** ⭐