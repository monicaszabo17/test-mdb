
require('dotenv').config();
var express = require("express");
const bodyParser = require("body-parser");
var User = require("./models/User");

var app = express();
var mongoose = require('mongoose').set('debug', true);

var  devurl = `mongodb+srv://monica17:${process.env.MONGO_PASSWORD}@cluster0.5livy.mongodb.net/todoWeekfour?retryWrites=true&w=majority`;

var mongodb = process.env.MONGODB_URI || devurl;

mongoose.connect(mongodb, {useNewUrlParser: true,  useCreateIndex: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
 var db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error: "));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.get('/allusers', async (req,res) =>{
     try{
          const users = await User.find({});
          if(users)  res.send(users);

     }catch(error){
          //console.log(error);
          res.status(500).json({message: error.message});
           }
});
app.get('/users', async(req,res)=>{
     try{
         const users = await User.find( { birthday :{$lt: ("2010-01-01")}});
          if(users)    res.status(200).send(users);
     }catch(error){
          res.status(400).send(error);
          }
                                                       
  });                   
          

app.get('/:id', async(req,res)=>{
     try{
          const user = await User.findById(req.params.id);
          if(user) res.send(user);
     }catch(error){
          console.log(error);
          res.status(500).json({message: error.message});
           }

});


var port = 3000;

app.listen(port,function(){
     console.log(`Node server running on ${port}`);
});
