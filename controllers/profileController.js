const User = require("../models/userModel");


exports.getProfile = (req, res) => {
    //user in req
    res.json({
                    userId: req.user._id, 
                    username: req.user.username, 
                    email: req.user.email,
                    gender: req.user.gender, 
                    address: req.user.address
    });
};