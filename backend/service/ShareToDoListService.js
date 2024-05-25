const SharedList = require("../model/SharedList");

class ShareToDoListService {
    
  static async createNewSharedList(userId, sharedListData) {
    try {
      const { title, description } = sharedListData;
      const newList = await SharedList.create({
        title: title,
        description: description,
        isAdded: false,
        userId: userId,
      });

      return newList;
    } catch (err) {
      console.error("Error creating list:", err);
      throw new Error("Failed to create list");
    }
  }

  static async findAllSharedList(userId) {
    try {
      const sharedToDoList = await SharedList.findAll({
        where: {
          isAdded: true,
          userId: userId,
        },
        attributes: ["id", "title", "description", "markedDone"],
      });

      return sharedToDoList;
    } catch (err) {
      console.error("Error fetching lists:", err);
      throw new Error("Failed to fetch lists");
    }
  }

  static async findOneList(listId) {
    try {
      const list = await SharedList.findOne({
        where: { id: listId },
      });
      return list;
    } catch (err) {
      console.error("Error finding list:", err);
      throw new Error("Failed to find list");
    }
  }

  static async deleteOneSharedList(listId, userId) {
    try {
      const rowsAffected = await SharedList.destroy({
        where: {
          id: listId,
          isAdded: true,
          userId: userId,
        },
      });

      return rowsAffected;
    } catch(err) {
      console.error("Error deleting list:", err);
      throw new Error("Internal Server Error");
    }
  }

  static async updateOneSharedList(listId, userId) {
    try {
      const [rowsAffected] = await SharedList.update(
        { markedDone: true },
        { where: { id: listId, userId: userId } }
      );
      return rowsAffected;
    } catch(err) {
        console.error("Error updating list:", err);
        throw new Error("Internal Server Error");
    }
  }
}

module.exports = ShareToDoListService;