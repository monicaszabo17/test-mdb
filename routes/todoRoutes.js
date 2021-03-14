const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");
const auth = require("../auth/auth");

//test route

router.get("/test", todoController.test);

router.post("", auth, todoController.addWeddingtodo);

router.put("/:id", auth, todoController.modifyWeddingtodo);

router.get("", todoController.allWeddingtodo);

router.get("/:id", todoController.getWeddingtodo);

router.delete("/:id", auth, todoController.deleteWeddingtodo);


module.exports = router;