const express = require('express');
const router = express.Router();
const facilityController = require('../controllers/facility');
const isAuth = require('../middleware/isAuth');
const userData = require('../middleware/userData');
const isAdminAuth = require('../middleware/isAdminAuth');
const adminData = require('../middleware/adminData');
router.get('/api/admin/facilities', [isAdminAuth, adminData], facilityController.getFacilities);
router.get('/api/admin/facility/:id', [isAdminAuth, adminData], facilityController.getFacility);
router.post('/api/admin/facilities/create', [isAdminAuth, adminData], facilityController.postFacility);
router.delete('/api/admin/facilities/:id', [isAdminAuth, adminData], facilityController.deleteFacility);

// User Route
router.get('/api/user/facilities', [isAuth, userData], facilityController.getFacilities);


module.exports = router;
