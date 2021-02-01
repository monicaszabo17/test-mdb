
var express = require("express");
const bodyParser = require("body-parser");


var todoRoutes = require("./routes/todoRoutes");
var app = express();
var mongoose = require("mongoose");
var devurl = "mongodb+srv://monica17:o2KkN6pxWvCXNFjv@cluster0.5livy.mongodb.net/todoWeekthree?retryWrites=true&w=majority";
var mongodb = process.env.MONGODB_URI || devurl ;
//mongoose.connect(mongodb);

mongoose.connect(mongodb, {useNewUrlParser:true, useUnifiedTopology:true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MDB connection Error :"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/todos", todoRoutes);

var port = 3000;
app.listen(port, () => {
    console.log(`Server run on port number" + ${port}`);
});

