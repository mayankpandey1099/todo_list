const List = require("../model/ToDoList");

class ToDoListService {
  static async findAllList(userId) {
    try {
      const Lists = await List.findAll({
        where: { userId: userId },
        attributes: ["id", "title", "description", "markedDone"],
      });
      return Lists;
    } catch (err) {
      console.error("Error fetching lists:", err);
      throw new Error("Failed to fetch lists");
    }
  }

  static async createNewList(userId, userData) {
    try {
      const { title, description } = userData;
      const newList = await List.create({
        title,
        description,
        userId: userId,
      });
      return newList;
    } catch (err) {
      console.error("Error creating list:", err);
      throw new Error("Failed to create list");
    }
  }

  static async findOneList(listId) {
    try {
      const list = await List.findOne({
        where: { id: listId },
      });
      return list;
    } catch (err) {
      console.error("Error finding list:", err);
      throw new Error("Failed to find list");
    }
  }

  static async deleteOneList(listId) {
    try {
      const affectedRows = await List.destroy({
        where: { id: listId },
      });
      return affectedRows;
    } catch (err) {
      console.error("Error deleting list:", err);
      throw new Error("Internal Server Error");
    }
  }

  static async updateOneList(listId, userId) {
    try {
      const [affectedRows] = await List.update(
        { markedDone: true },
        { where: { id: listId, userId: userId } }
      );
      return affectedRows;
    } catch (err) {
      console.error("Error updating list:", err);
      throw new Error("Internal Server Error");
    }
  }
}

module.exports = ToDoListService;
