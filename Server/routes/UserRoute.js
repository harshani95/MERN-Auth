const express = require('express');
const router = express.Router();
const verifyUser = require('../utils/verifyUser');

const userController = require('../controller/UserController');


router.get('/', userController.test);
router.put('/update/:id', verifyUser, userController.updateUser);
router.delete('/delete/:id', verifyUser, userController.deleteUser);

module.exports=router;