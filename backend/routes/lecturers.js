const express = require('express');
const router = express.Router();
const lecturerController = require('../controllers/lecturers');
const isAuth = require('../middleware/isAuth');
const userData = require('../middleware/userData')
const isAdminAuth = require('../middleware/isAdminAuth');
const adminData = require('../middleware/adminData');
router.post('/api/admin/lecturers/generate', [isAdminAuth, adminData], lecturerController.postGenerateToken);
router.get('/api/admin/lecturers/get-token', [isAdminAuth, adminData], lecturerController.getToken);
router.get('/api/admin/lecturers', [isAdminAuth, adminData], lecturerController.getLecturer);
router.delete('/api/admin/lecturer/:id', [isAdminAuth, adminData], lecturerController.deleteLecturer);
router.get('/api/admin/get-graph', [isAdminAuth, adminData], lecturerController.getGraph);

// User Route
router.get('/api/user/get-graph', [isAuth, userData], lecturerController.getGraph);
router.get('/api/user/profile', [isAuth, userData], lecturerController.getProfile);
router.post('/api/user/profile', [isAuth, userData], lecturerController.postProfile);
module.exports = router;
