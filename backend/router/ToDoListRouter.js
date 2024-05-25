const express = require("express");
const ToDoListController = require("../controller/ToDoListControllers");
const AuthMiddleware = require("../middleware/AuthMiddleware");

const listRouter = express.Router();

listRouter.post("/",AuthMiddleware.verify, ToDoListController.createList);
listRouter.get("/lists", AuthMiddleware.verify, ToDoListController.getAllToDoList);
listRouter.delete("/:id", AuthMiddleware.verify, ToDoListController.deleteList);
listRouter.patch("/update/:id", AuthMiddleware.verify, ToDoListController.updateMarkedDone);

module.exports = listRouter;
