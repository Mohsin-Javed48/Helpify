const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');

// Admin routes
router.get('/', adminController.getAllAdmins);
router.get('/:id', adminController.getAdminById);
router.post('/', adminController.createAdmin);
router.post('/login', adminController.loginAdmin);

module.exports = router; 