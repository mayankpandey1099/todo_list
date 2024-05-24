const express = require("express");
const {
  createList,
  getPaginatedList,
  deleteList,
  updateMarkedDone,
} = require("../src/controller/todoListController");

const listRouter = express.Router();

listRouter.post("/", createList);
listRouter.get("/lists", getPaginatedList);
listRouter.delete("/:id", deleteList);
listRouter.put("/:id", updateMarkedDone);

module.exports = listRouter;
