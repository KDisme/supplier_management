const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');

// Route cho danh sách nhà cung cấp
router.get('/', supplierController.index);

// Route cho form tạo nhà cung cấp mới
router.get('/create', supplierController.create);

// Route để lưu nhà cung cấp mới
router.post('/', supplierController.store);

// Route cho form chỉnh sửa nhà cung cấp
router.get('/:id/edit', supplierController.edit);

// Route để xem chi tiết nhà cung cấp
router.get('/:id', supplierController.show);

// Route để cập nhật nhà cung cấp
router.put('/:id', supplierController.update);

// Route để xóa nhà cung cấp
router.delete('/:id', supplierController.destroy);

module.exports = router;