const User = require("../model/userModel");
const SharedList = require("../model/sharedListModel");



const createSharedList = async (req, res) => {
  const userId = req.params.id;
  const { title, description } = req.body;
  try {
    const newList = await SharedList.create({
      title: title,
      description: description,
      isAdded: false,
      userId: userId,
    });

    res.status(201).json("added new list");
  } catch (error) {
    console.error("Error creating shared list:", error);
    res.status(500).json({ 
        error: "Internal server error" 
    });
  }
}


const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ 
        error: "Internal Server Error" 
    });
  }
};

const getSharedList = async (req, res) => {
  const userId = req.user.userId;
  console.log(userId);
  try {
    const sharedLists = await SharedList.findAll({
      where: {
        isAdded: true,
        userId: userId,
      }
    });
    res.status(200).json(sharedLists);
  } catch (error) {
    console.error("Error fetching shared lists:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getNotification = async (req, res) => {
  const userId = req.user.userId;
  try {
    const notifications = await SharedList.findAll({
      where: {
        isAdded: false,
        userId: userId,
      }
    });
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteNotification = async (req, res) => {
  const userId = req.user.userId;
  const listId = req.params.id;
  try {
    await SharedList.destroy({
      where: {
        id: listId,
        isAdded: false,
        userId: userId,
      },
    });
    res.status(202).json("notification deleted successfully");
  } catch (error) {
    console.error("Error deleting notification:", error);
    res.status(500).json({ 
        error: "Internal Server Error"
    });
  }
};

const deleteSharedList = async (req, res) => {
  const userId = req.user.userId;
  const listId = req.params.id;
  try {
    await SharedList.destroy({
      where: {
        id: listId,
        isAdded: true,
        userId: userId,
      },
    });
    res.status(202).json("Shared List deleted successfully");
  } catch (error) {
    console.error("Error deleting shared list:", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const updateSharedList = async (req, res) => {
  const listId = req.params.id;
  console.log(listId);
  try {
    await SharedList.update(
      { isAdded: true },
      {
        where: {
          id: listId,
        },
      }
    );
    res.status(200).json("updated shared list successfully");
  } catch (error) {
    console.error("Error updating shared list:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateMarkedDone = async (req, res) => {
  const listId = req.params.id;
  console.log(listId);
  try {
    await SharedList.update(
      { markedDone: true },
      {
        where: {
          id: listId,
        },
      }
    );
    res.status(200).json("marked as done successfully");
  } catch (error) {
    console.error("Error in marking as done the list:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



module.exports = {getAllUsers, getSharedList, getNotification, deleteNotification, createSharedList, updateSharedList, updateMarkedDone, deleteSharedList};




