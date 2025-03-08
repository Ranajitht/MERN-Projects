const express = require('express');
const userController = require('../controllers/userController');
const authenticate = require('../middleware/auth');
const isAdmin = require('../middleware/role');

const router = express.Router();

// Get all users (Admin only)
router.get('/', authenticate, isAdmin, userController.getAllUsers);

// Update user role (Admin only)
router.put('/:userId/role', authenticate, isAdmin, userController.updateUserRole);

module.exports = router;