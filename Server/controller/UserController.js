const errorHandler = require("../utils/error");
const User = require("../models/User");
const bcrypt = require("bcrypt");

 const test = (req, res) => {
    res.json({
      message: 'API is working!',
    });
  };

  const updateUser = async(req, res, next) => {
    if(req.user.id !== req.params.id) {
      return next(errorHandler(401, 'You are not authorized to update this user'))
    }

    try{
      if(req.body.password) {
        req.body.password =  bcrypt.hashSync(req.body.password, 10);
      }

      const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: {
          username:req.body.username,
          email: req.body.email,
          password: req.body.password
        },
      },{ new : true}
    );
      const {password, ...others} = updatedUser._doc;
      res.status(200).json(others);
    } catch(error) {
      next(error);
    }
  };

module.exports = {
    test,
    updateUser
}