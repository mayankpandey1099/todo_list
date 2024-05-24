const express = require("express");
const {createList, getPaginatedList, deleteList, updateList} = require("../controller/todoListController");

const listRouter = express.Router();

listRouter.post("/", createList);
listRouter.get("/lists", getPaginatedList);
listRouter.delete("/:id", deleteList);
listRouter.put("/:id", updateList);

module.exports = listRouter;
