
const express = require("express");
const NotificationController = require("../controller/NotificationController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const notifyRouter = express.Router();

notifyRouter.get("/lists", AuthMiddleware.verify, NotificationController.getAllNotification);
notifyRouter.delete("/delete/:id", AuthMiddleware.verify, NotificationController.deleteNotification);
notifyRouter.patch("/update/:id", AuthMiddleware.verify, NotificationController.updateNotification);

module.exports = notifyRouter;

