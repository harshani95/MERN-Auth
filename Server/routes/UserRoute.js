const express = require('express');
const router = express.Router();

const userController = require('../controller/UserController');
const verifyUser = require('../utils/verifyUser');


router.get('/', userController.test);
router.put('/update/:id', verifyUser, userController.updateUser);
router.delete('/delete/:id', verifyUser, userController.deleteUser);

module.exports=router;