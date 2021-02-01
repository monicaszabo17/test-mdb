

var Todo = require("../models/todoModel");

//get test /route handler
exports.test = function(req, res){
    res.send("Best regards Eduonix.");
};

//create  route : for a new todo
exports.newtodo = function(req, res){
    var todo = new Todo(
        { 
            title: req.body.title,
            dueByDate: req.body.dueByDate,
            createdOn: req.body.createdOn,
            status: req.body.status,
            active: req.body.active,
            userName: req.body.userName
        }
    );
    todo.save(function(err, todo){
        if(err){
            return next(err);
        }
        res.send(`Todo ('+ todo.id +') was created successfully`);
    })
};

//get specific todo (id)/ route handler
exports.onetodo = function(req, res){
    Todo.findById(req.params.id, function(err, todo){
        if(err){
            return next(err);
        }
        res.send(todo);
    })
};

//get-alltodos /route handler
exports.alltodos = function(req, res){
    Todo.find(function(err, todo){
        if(err){
            return next(err);
        }
        res.send(todo);
    })
};

//put-update a specific todo(id) / route handler
exports.modifytodo = function(req, res){
    Todo.findByIdAndUpdate(req.params.id, {$set: req.body}, function(err, todo){
        if(err){
            return next(err);
        }
        //res.send(`Todo (" + todo.id + ")  was created successfully \n` + todo);
        res.send("Todo was successfully updated.");
    })
};

//delete a specific todo(id) / route handler
exports.deletetodo = function(req, res){
    Todo.findByIdAndRemove(req.params.id, function(err, todo){
        if(err){
            return next(err);
        }
        res.send(" Todo selected was successfully deleted. ")
    })
};

