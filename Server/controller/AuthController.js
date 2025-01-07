const userSchema = require('../models/UserSchema');
const bcrypt = require('bcryptjs');

const signup = async(req, res, next) => {
    const {username, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userSchema({username, email, password:hashedPassword});

 try{
    await user.save();
    res.status(200).json({message: 'User created successfully'});
 }
 catch(e){
    next(error);
 }  
}

module.exports = {
    signup
}