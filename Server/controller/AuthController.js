const userSchema = require('../models/UserSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const errorHandler = require('../utils/error');

const signup = async(req, res) => {
    const {username, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userSchema({username, email, password:hashedPassword});

 try{
    await user.save();
    res.status(200).json({message: 'User created successfully'});
 }
 catch(e){
   console.log(e);
 }  
}

const signin = async(req, res, next) => {
    const {email, password} = req.body;
    try{
        const validUser = await userSchema.findOne({email});
        if(!validUser)
            return res.next(errorHandler(404, 'User not found'));

        const isPasswordValid = bcrypt.compareSync(password, validUser.password);
        if(!isPasswordValid)
            return res.next(errorHandler(401, 'Wrong Credentials'));

        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        const {password:hashedPassword, ...otherDetails} = validUser._doc;
        res
            .cookie('access_token', token, {httpOnly: true})
            .status(200)
            .json(otherDetails);
    
    }
    catch(e){
        next(e);
    }
};

module.exports = {
    signup,
    signin
}