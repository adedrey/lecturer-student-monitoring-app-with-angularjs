const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.post('/api/signup', authController.postSignup);
router.post('/api/login', authController.postLogin);

/*
  Admin Authentication Begins
*/

router.post('/api/admin/login', authController.postAdminLogin);
module.exports = router
