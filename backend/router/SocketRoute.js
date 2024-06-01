const NotificationController = require("../controller/NotificationController");
const ShareToDoListController = require("../controller/SharedToDoListController");

const socketHandler = (io) => {
  const clients = new Map();

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("disconnect", () => {
      console.log("A user disconnected");
      clients.forEach((clientWs, clientId) => {
        if (clientWs === socket) {
          clients.delete(clientId);
        }
      });
    });

    socket.on("send notification", async (data) => {
      const { recipientUserId, notification } = data;

      const newData = await ShareToDoListController.createSharedToDoList(
        recipientUserId,
        notification,
      );

      if (newData) {
        const recipientSocket = clients.get(recipientUserId);
        if (recipientSocket) {
          recipientSocket.emit("notification", {notification: newData});
        }
      }
    });

    socket.on("register", async (userId) => {
      clients.set(userId, socket);
      console.log(`User ${userId} registered with socket ${socket.id}`);
    });
  });
};

module.exports = socketHandler;
