//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const todoRoutes = require("./routes/todoRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const mongodb = process.env.MONGO_CLUSTER_URL || process.env.EXPRESS_PORT;

mongoose.connect(mongodb, {useNewUrlParser:true, useUnifiedTopology:true});
mongoose.set("useCreateIndex", true);

mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MDB connection Error :"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use(passport.initialize());
require("./config/passport")(passport);
app.use("/api/users" ,  userRoutes);
app.use("/api/weddingtodos", todoRoutes);



app.listen(process.env.EXPRESS_PORT, () => {
    console.log(`Server run on port number" + ${process.env.EXPRESS_PORT}`);
});





