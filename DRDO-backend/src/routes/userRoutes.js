const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

// Admin only routes
router.get('/', protect, authorize('admin'), userController.getAllUsers);
router.get('/:id', protect, authorize('admin'), userController.getUserById);
router.put('/:id/role', protect, authorize('admin'), userController.updateUserRole);
router.put('/:id/status', protect, authorize('admin'), userController.toggleUserStatus);
router.delete('/:id', protect, authorize('admin'), userController.deleteUser);

module.exports = router;
