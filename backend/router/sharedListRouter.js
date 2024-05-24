const express = require("express");
const {
  getAllUsers,
  getSharedList,
  getNotification,
  deleteNotification,
  createSharedList,
  updateSharedList,
  updateMarkedDone,
} = require("../controller/sharedListController");

const sharedRouter = express.Router();

sharedRouter.get("/users", getAllUsers);

sharedRouter.get("/notify", getNotification);
sharedRouter.delete("/notify/:id", deleteNotification);

sharedRouter.post("/:id", createSharedList);
sharedRouter.get("/list", getSharedList);
sharedRouter.put("/list/:id", updateSharedList);
sharedRouter.put("/list/update/:id", updateMarkedDone);

module.exports = sharedRouter;
