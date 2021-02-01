
var express = require("express");
var router = express.Router();


var todoController = require("../controllers/todoController");

//test route
router.get("/test", todoController.test);

//create  route : for a new todo
router.post("/create", todoController.newtodo);

//get route :all todos
router.get("/all", todoController.alltodos);

//get route : for a specific todo
router.get("/:id", todoController.onetodo);

//update route : for a todo
router.put("/update/:id", todoController.modifytodo);

//delete  route : for a todo
router.delete("/delete/:id", todoController.deletetodo);

module.exports = router;


