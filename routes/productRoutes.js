const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Route cho danh sách sản phẩm
router.get('/', productController.index);

// Route cho form tạo sản phẩm mới
router.get('/create', productController.create);

// Route để lưu sản phẩm mới
router.post('/', productController.store);

// Route cho form chỉnh sửa sản phẩm
router.get('/:id/edit', productController.edit);

// Route để xem chi tiết sản phẩm
router.get('/:id', productController.show);

// Route để cập nhật sản phẩm
router.put('/:id', productController.update);

// Route để xóa sản phẩm
router.delete('/:id', productController.destroy);

module.exports = router;