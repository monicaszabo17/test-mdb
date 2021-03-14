const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
const passport = require("passport");
require("./config/passport")(passport);

//profile protected route

router.get("/profile", passport.authenticate("jwt", { session: false }) , profileController.getProfile);



module.exports = router;