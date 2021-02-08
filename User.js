var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var UserSchema = new mongoose.Schema({
     id: {
        type: Number,
        required: true,
      },
     username: {
        type: String,
        required: true,
      },
      email: {
         type: String,
         required: true,
      },
      password: {
        type: String,
        required: true,
      },
      birthday:{
         type:Date,
         required: true,
       },
       country:{
           type: String,
          required: true,
        }
  },{collection: "users"});
  
module.exports = mongoose.model("User", UserSchema);