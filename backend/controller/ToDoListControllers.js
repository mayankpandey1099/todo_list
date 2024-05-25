const ToDoListService = require("../service/ToDoListService");

class ToDoListController {
  static async getAllToDoList(req, res) {
    try {
      const userId = req.user.userId;
      const rows = await ToDoListService.findAllList(userId);

      res.json({
        lists: rows,
      });
      console.log("successfully dispatched the data");
    } catch (error) {
      console.error("Error fetching paginated lists:", error);
      res.status(500).json({
        error: "An error occurred while fetching paginated lists.",
      });
    }
  }

  static async createList(req, res) {
    try {
      const userData = req.body;
      const userId = req.user.userId;

      const newList = await ToDoListService.createNewList(userId, userData);

      res.status(201).json(newList);
    } catch (error) {
      console.error("Error creating todo-list:", error);
      res.status(500).json({
        error: "An error occurred while inserting the user.",
      });
    }
  }

  static async deleteList(req, res) {
    const listId = req.params.id;
    try {
      const list = await ToDoListService.findOneList(listId);
      if (!list) {
        return res.status(404).json({
          error: "List not found",
        });
      }
      const rowsAffected = await ToDoListService.deleteOneList(listId);
      if (rowsAffected === 0) {
        return res.status(404).json({
          error: "failed to delete the list",
        });
      }
      res.json({
        message: "List deleted successfully",
      });
    } catch (error) {
      console.error("error deleting list:", error);
      res.status(500).json({
        error: "An error occurred while deleting the list.",
      });
    }
  }

  static async updateMarkedDone(req, res) {
    const listId = req.params.id;
    try {
      const userId = req.user.userId;

      const list = await ToDoListService.findOneList(listId);

      if (!list) {
        return res.status(404).json({
          error: "List not found",
        });
      }
      const rowsAffected = await ToDoListService.updateOneList(listId, userId);
      if (rowsAffected === 0) {
        return res.status(404).json({
          error: "Failed to update the list",
        });
      }
      const updatedToDoList = await ToDoListService.findOneList(listId);

      res.status(200).json(updatedToDoList);
    } catch (error) {
      console.error("error updating todo-list:", error);
      res.status(500).json({
        error: "An error occurred while updating the list.",
      });
    }
  }
}

module.exports = ToDoListController;
