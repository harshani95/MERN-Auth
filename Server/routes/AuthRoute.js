const express = require('express');
const router = express.Router();

const authController = require('../controller/AuthController');

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.post('/google', authController.googleLogin);

module.exports=router;