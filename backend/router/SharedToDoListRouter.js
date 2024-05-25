const express = require("express");
const ShareToDoListController = require("../controller/SharedToDoListController");
const AuthMiddleware = require("../middleware/AuthMiddleware");

const sharedRouter = express.Router();

sharedRouter.post("/:id", AuthMiddleware.verify, ShareToDoListController.createSharedToDoList);
sharedRouter.get("/lists", AuthMiddleware.verify, ShareToDoListController.getAllSharedToDoList);
sharedRouter.delete("/delete/:id", AuthMiddleware.verify, ShareToDoListController.deleteSharedList);
sharedRouter.patch("/update/:id", AuthMiddleware.verify, ShareToDoListController.updateMarkedDone);

module.exports = sharedRouter;
