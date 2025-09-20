# API Testing Guide với Postman

## 🚀 Khởi động server
```bash
npm start
# Server chạy tại: http://localhost:3000
```

## 📋 API Endpoints

### 🏢 **SUPPLIERS API**

#### 1. GET - Lấy danh sách nhà cung cấp
```
Method: GET
URL: http://localhost:3000/api/suppliers
Headers: 
  Content-Type: application/json
  Accept: application/json
```

#### 2. GET - Xem chi tiết nhà cung cấp
```
Method: GET
URL: http://localhost:3000/api/suppliers/{oid}
Headers: 
  Content-Type: application/json
  Accept: application/json

Ví dụ: http://localhost:3000/api/suppliers/SUP_675e8d2c123456789abcdef0
```

#### 3. GET - Form tạo nhà cung cấp (lấy thông tin cần thiết)
```
Method: GET
URL: http://localhost:3000/api/suppliers/create
Headers: 
  Content-Type: application/json
  Accept: application/json
```

#### 4. POST - Tạo nhà cung cấp mới
```
Method: POST
URL: http://localhost:3000/api/suppliers
Headers: 
  Content-Type: application/json
  Accept: application/json

Body (JSON):
{
  "name": "Nhà cung cấp ABC",
  "address": "123 Đường ABC, TP.HCM",
  "phone": "0123456789"
}
```

#### 5. GET - Lấy thông tin để chỉnh sửa nhà cung cấp
```
Method: GET
URL: http://localhost:3000/api/suppliers/{oid}/edit
Headers: 
  Content-Type: application/json
  Accept: application/json
```

#### 6. PUT - Cập nhật nhà cung cấp
```
Method: PUT
URL: http://localhost:3000/api/suppliers/{oid}
Headers: 
  Content-Type: application/json
  Accept: application/json

Body (JSON):
{
  "name": "Nhà cung cấp ABC Updated",
  "address": "456 Đường XYZ, TP.HCM",
  "phone": "0987654321"
}
```

#### 7. DELETE - Xóa nhà cung cấp
```
Method: DELETE
URL: http://localhost:3000/api/suppliers/{oid}
Headers: 
  Content-Type: application/json
  Accept: application/json
```

---

### 📦 **PRODUCTS API**

#### 1. GET - Lấy danh sách sản phẩm
```
Method: GET
URL: http://localhost:3000/api/products
Headers: 
  Content-Type: application/json
  Accept: application/json
```

#### 2. GET - Xem chi tiết sản phẩm
```
Method: GET
URL: http://localhost:3000/api/products/{oid}
Headers: 
  Content-Type: application/json
  Accept: application/json
```

#### 3. GET - Form tạo sản phẩm (lấy danh sách nhà cung cấp)
```
Method: GET
URL: http://localhost:3000/api/products/create
Headers: 
  Content-Type: application/json
  Accept: application/json
```

#### 4. POST - Tạo sản phẩm mới
```
Method: POST
URL: http://localhost:3000/api/products
Headers: 
  Content-Type: application/json
  Accept: application/json

Body (JSON):
{
  "name": "Sản phẩm XYZ",
  "price": 100000,
  "quantity": 50,
  "oid_supplier": "SUP_675e8d2c123456789abcdef0"
}
```

#### 5. GET - Lấy thông tin để chỉnh sửa sản phẩm
```
Method: GET
URL: http://localhost:3000/api/products/{oid}/edit
Headers: 
  Content-Type: application/json
  Accept: application/json
```

#### 6. PUT - Cập nhật sản phẩm
```
Method: PUT
URL: http://localhost:3000/api/products/{oid}
Headers: 
  Content-Type: application/json
  Accept: application/json

Body (JSON):
{
  "name": "Sản phẩm XYZ Updated",
  "price": 150000,
  "quantity": 75,
  "oid_supplier": "SUP_675e8d2c123456789abcdef0"
}
```

#### 7. DELETE - Xóa sản phẩm
```
Method: DELETE
URL: http://localhost:3000/api/products/{oid}
Headers: 
  Content-Type: application/json
  Accept: application/json
```

---

## 🎯 **Test Scenarios**

### Scenario 1: Tạo workflow hoàn chỉnh
1. **Tạo nhà cung cấp** → POST /api/suppliers
2. **Lấy danh sách nhà cung cấp** → GET /api/suppliers (copy oid)
3. **Tạo sản phẩm** → POST /api/products (dùng oid từ bước 2)
4. **Xem chi tiết nhà cung cấp** → GET /api/suppliers/{oid} (xem products)
5. **Cập nhật sản phẩm** → PUT /api/products/{oid}
6. **Xóa sản phẩm** → DELETE /api/products/{oid}
7. **Xóa nhà cung cấp** → DELETE /api/suppliers/{oid}

### Scenario 2: Error handling
1. **Xem sản phẩm không tồn tại** → GET /api/products/invalid_oid
2. **Tạo sản phẩm với nhà cung cấp không tồn tại** → POST /api/products
3. **Xóa nhà cung cấp có sản phẩm** → DELETE /api/suppliers/{oid}

---

## 📝 **Response Format**

### Thành công (Success)
```json
{
  "success": true,
  "data": { ... },
  "message": "Thông báo thành công"
}
```

### Lỗi (Error)
```json
{
  "success": false,
  "message": "Thông báo lỗi",
  "error": "Chi tiết lỗi"
}
```

---

## 🌐 **Web Interface**

Vẫn có thể truy cập giao diện web tại:
- **Suppliers**: http://localhost:3000/suppliers
- **Products**: http://localhost:3000/products

---

## 🔧 **Tips cho Postman**

1. **Environment Variables**:
   - Tạo environment với `base_url = http://localhost:3000`
   - Dùng `{{base_url}}/api/suppliers`

2. **Collection Variables**:
   - Lưu `supplier_oid` và `product_oid` từ response để dùng lại

3. **Tests Script**:
   ```javascript
   // Lưu oid từ response
   if (pm.response.json().success && pm.response.json().data.oid) {
       pm.environment.set("supplier_oid", pm.response.json().data.oid);
   }
   ```

4. **Headers Preset**:
   ```
   Content-Type: application/json
   Accept: application/json
   ```