const express = require('express');
const router = express.Router();
const verifyUser = require('../utils/verifyUser');

const userController = require('../controller/UserController');
const { default: verifyUser } = require('../utils/verifyUser');

router.get('/', userController.test);
router.post('/update:id', verifyUser, userController.updateUser);

module.exports=router;