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

const googleLogin = async (req, res, next) => {
    try {
      const user = await userSchema.findOne({ email: req.body.email });

      if (user) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {expiresIn: '1h' });
        const { password: hashedPassword, ...otherDetails } = user._doc;
        
        res
          .cookie('access_token', token, {httpOnly: true})
          .status(200)
          .json(otherDetails);
      } 
      else {
        const generatedPassword =Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
        const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
        const newUser = new userSchema({
          username:req.body.name.split(' ').join('').toLowerCase() + Math.random().toString(36).slice(-8),
          email: req.body.email,
          password: hashedPassword,
          profilePicture: req.body.photo,
        });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {expiresIn: '1h' });
        const { password: hashedPassword2, ...rest } = newUser._doc;
        
        res
          .cookie('access_token', token, {httpOnly: true,})
          .status(200)
          .json(rest);
      }
    } catch (error) {
      next(error);
    }
}

const signOut = async (req, res, next) => {
    res.clearCookie('access_token');
    res.status(200).json({ message: 'User logged out successfully' });
}

module.exports = {
    signup,
    signin,
    googleLogin,
    signOut
}