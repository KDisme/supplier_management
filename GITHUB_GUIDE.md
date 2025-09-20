# 🚀 Hướng dẫn đưa code lên GitHub

## Bước 1: Chuẩn bị Git và GitHub

### 1.1 Cài đặt Git (nếu chưa có)
```bash
# Kiểm tra Git đã cài chưa
git --version

# Nếu chưa có, tải Git tại: https://git-scm.com/
```

### 1.2 Cấu hình Git (lần đầu)
```bash
git config --global user.name "Tên của bạn"
git config --global user.email "email@example.com"
```

### 1.3 Tạo tài khoản GitHub (nếu chưa có)
- Truy cập: https://github.com
- Đăng ký tài khoản mới

## Bước 2: Tạo Repository trên GitHub

### 2.1 Tạo Repository mới
1. Đăng nhập vào GitHub
2. Click nút **"New"** hoặc **"+"** → **"New repository"**
3. Điền thông tin:
   - **Repository name**: `supplier-product-management`
   - **Description**: `Hệ thống quản lý sản phẩm và nhà cung cấp với Node.js`
   - Chọn **Public** hoặc **Private**
   - **KHÔNG** tick "Add a README file" (vì đã có sẵn)
4. Click **"Create repository"**

### 2.2 Sao chép URL Repository
- Sau khi tạo xong, sao chép URL (chọn HTTPS):
```
https://github.com/[username]/supplier-product-management.git
```

## Bước 3: Khởi tạo Git trong project

### 3.1 Mở Terminal/PowerShell tại thư mục project
```bash
cd "D:\LapTrinhNodeJS\BAITAPTH"
```

### 3.2 Khởi tạo Git repository
```bash
git init
```

### 3.3 Thêm file vào staging area
```bash
# Thêm tất cả file
git add .

# Hoặc thêm từng file cụ thể
git add README.md
git add package.json
git add app.js
```

### 3.4 Commit lần đầu
```bash
git commit -m "Initial commit: Supplier Product Management System"
```

### 3.5 Thêm remote repository
```bash
git remote add origin https://github.com/[username]/supplier-product-management.git
```

### 3.6 Đẩy code lên GitHub
```bash
# Đẩy lên branch main
git push -u origin main

# Nếu gặp lỗi, thử:
git push -u origin master
```

## Bước 4: Xác minh upload thành công

### 4.1 Kiểm tra trên GitHub
- Truy cập repository trên GitHub
- Kiểm tra các file đã upload:
  - ✅ README.md
  - ✅ package.json
  - ✅ app.js
  - ✅ Controllers, Models, Views, Routes
  - ✅ .gitignore

### 4.2 Kiểm tra README hiển thị đẹp
- GitHub sẽ tự động hiển thị nội dung README.md
- Kiểm tra các markdown format có hiển thị đúng không

## Bước 5: Cập nhật code trong tương lai

### 5.1 Workflow cơ bản
```bash
# 1. Kiểm tra trạng thái
git status

# 2. Thêm file thay đổi
git add .

# 3. Commit với message mô tả
git commit -m "Add new feature: Product statistics"

# 4. Đẩy lên GitHub
git push
```

### 5.2 Tạo branch cho feature mới
```bash
# Tạo và chuyển sang branch mới
git checkout -b feature/new-dashboard

# Làm việc trên branch...
# Commit changes...

# Đẩy branch lên GitHub
git push -u origin feature/new-dashboard

# Tạo Pull Request trên GitHub để merge
```

## Bước 6: Tùy chỉnh Repository

### 6.1 Thêm topics (tags)
1. Vào repository trên GitHub
2. Click "⚙️ Settings"
3. Thêm topics: `nodejs`, `express`, `mongodb`, `bootstrap`, `crud`

### 6.2 Thêm description
- Mô tả ngắn gọn về project

### 6.3 Thêm website URL (nếu deploy)
- Nếu deploy lên Heroku/Vercel, thêm URL vào

### 6.4 Tạo releases
```bash
# Tạo tag version
git tag -a v1.0.0 -m "First stable release"
git push origin v1.0.0
```

## Bước 7: Cộng tác (nếu làm nhóm)

### 7.1 Thêm collaborators
1. Vào "Settings" → "Manage access"
2. Click "Invite a collaborator"
3. Nhập username/email của thành viên

### 7.2 Quy trình làm việc nhóm
```bash
# Trước khi làm việc, pull code mới nhất
git pull origin main

# Tạo branch cho feature
git checkout -b feature/your-feature

# Làm việc và commit
git add .
git commit -m "Your changes"

# Push branch
git push origin feature/your-feature

# Tạo Pull Request trên GitHub
```

## 🚨 Lưu ý quan trọng

### ✅ DO
- Luôn viết commit message có ý nghĩa
- Sử dụng .gitignore để loại bỏ file không cần thiết
- Thường xuyên pull code mới nhất khi làm nhóm
- Backup code trước khi thử nghiệm

### ❌ DON'T
- Không commit file `node_modules/`
- Không commit file `.env` chứa thông tin nhạy cảm
- Không force push (`git push --force`) khi làm nhóm
- Không commit code chưa test

## 🆘 Troubleshooting

### Lỗi "Permission denied"
```bash
# Sử dụng Personal Access Token thay vì password
# Vào GitHub Settings → Developer settings → Personal access tokens
```

### Lỗi "Branch không tồn tại"
```bash
# Đổi main thành master hoặc ngược lại
git push -u origin master
```

### Undo commit cuối cùng
```bash
git reset --soft HEAD~1
```

### Xóa file khỏi Git tracking
```bash
git rm --cached filename
```

---

🎉 **Chúc mừng! Code của bạn đã lên GitHub thành công!**

Chia sẻ link repository để mọi người có thể xem và đóng góp! 🚀