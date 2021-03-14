const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { find } = require("../models/userModel");
const User = require("../models/userModel");


exports.userRegister = (req, res, next) => {
  bcrypt.hash(req.body.password, 8).then(hash=> {
    const user = new User({
      username: req.body.username,
      password: hash,
      email: req.body.email,
      gender: req.body.gender,
      address: req.body.address    
    });

    user.save()
      .then(data => {
        res.status(201).json({
          message: "New user registered.",
          data: data
        });
      })
      .catch(err => {
        res.status(500).json({
          message: "Invalid credentials!"
        });
      });
  });
}


exports.userLogin = (req,res,next) => {
  let findUser;
  User.findOne({email:req.body.email}).then(user => {
    if(!user){
      return res.status(401).json({
        msg:"Authentication failed"
      });
    }
    findUser = user;
    return bcrypt.compare(req.body.password, user.password);
  })
  .then(data => {
     if(!data){
       return res.status(401).json({
         msg:"Authentication failed"
       });
     }
     const payload = {
                    userId: findUser._id, 
                    username: findUser.username, 
                    email: findUser.email,
                    gender: findUser.gender, 
                    address: findUser.address
                  }
        jwt.sign(
        payload,
        process.env.JWT_SECRET,
        process.env.JWT_EXPIRES_IN
      );
      res.status(200).json({
        success: true,
        token: "Bearer" + token,
        userId: findUser._id
       });
  })
  .catch(err => {
     return res.status(401).json({
       msg: "Wrong credentials"
     });
  });
}