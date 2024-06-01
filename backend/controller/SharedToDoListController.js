const ShareTodoListService = require("../service/ShareToDoListService");

class ShareToDoListController {
  
  static async createSharedToDoList(recipientUserId, notification) {
    const userId = recipientUserId;
    const sharedListData = notification;

    try {
      const newList = await ShareTodoListService.createNewSharedList(
        userId,
        sharedListData
      );
      return newList.dataValues;
    } catch (error) {
      console.error("Error creating shared list:", error);
      throw new Error("error creating shared list");
    }
  }

  static async getAllSharedToDoList(req, res) {
    const userId = req.user.userId;
    try {
      const sharedToDoLists = await ShareTodoListService.findAllSharedList(
        userId
      );
      res.status(200).json(sharedToDoLists);
    } catch (error) {
      console.error("Error fetching shared lists:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async deleteSharedList(req, res) {
    const userId = req.user.userId;
    const listId = req.params.id;
    try {
      const rowsAffected = await ShareTodoListService.deleteOneSharedList(
        listId,
        userId
      );
      if (rowsAffected === 0) {
        return res.status(404).json({
          error: "failed to delete the list",
        });
      }
      res.status(202).json("Shared List deleted successfully");
    } catch (error) {
      console.error("Error deleting shared list:", error);
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }

  static async updateMarkedDone(req, res) {
    const userId = req.user.userId;
    const listId = req.params.id;
    try {
      const list = await ShareTodoListService.findOneList(listId);
      if (!list) {
        return res.status(404).json({
          error: "List not found",
        });
      }
      const rowsAffected = ShareTodoListService.updateOneSharedList(
        listId,
        userId
      );
      if (rowsAffected === 0) {
        return res.status(404).json({
          error: "Failed to update the list",
        });
      }
      const updatedList = await ShareTodoListService.findOneList(listId);
      res.status(200).json(updatedList);
    } catch (error) {
      console.error("Error in marking as done the list:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = ShareToDoListController;
