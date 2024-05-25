const express = require("express");
//importing routes
const UserRouter = require("./UserRouter");
const listRouter = require("./ToDoListRouter");
const sharedRouter = require("./SharedToDoListRouter");
const notifyRouter = require("./NotificationRouter");


const router = express.Router();

//initializing the route endpoint
router.use("/user", UserRouter);
router.use("/todolist", listRouter);
router.use("/sharedtodolist", sharedRouter);
router.use("/notification", notifyRouter);


module.exports = router;