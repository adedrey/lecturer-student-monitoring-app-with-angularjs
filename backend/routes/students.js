const express = require('express');
const router = express.Router();
const studentController = require('../controllers/students');
const isAuth = require('../middleware/isAuth');
const userData = require('../middleware/userData');
const isAdminAuth = require('../middleware/isAdminAuth');
const adminData = require('../middleware/adminData');
router.post('/api/admin/students/create', [isAdminAuth, adminData], studentController.postStudent);
router.get('/api/admin/students', [isAdminAuth, adminData], studentController.getStudents);
router.delete('/api/admin/students/:id', [isAdminAuth, adminData], studentController.deleteStudent);

// User Route
router.get('/api/user/students', [isAuth, userData], studentController.getStudents);

module.exports = router;
