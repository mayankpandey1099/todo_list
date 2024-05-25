const NotificationService = require("../service/NotificationService");

class NotificationController {
  static async getAllNotification(req, res) {
    const userId = req.user.userId;
    try {
      const notifications = await NotificationService.findAllNotification(
        userId
      );
      res.status(200).json(notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async deleteNotification(req, res) {
    const userId = req.user.userId;
    const listId = req.params.id;
    try {
      const rowsAffected = await NotificationService.deleteOneNotification(
        listId,
        userId
      );
      if (rowsAffected === 0) {
        return res.status(404).json({
          error: "failed to delete the notification",
        });
      }
      res.status(202).json("notification deleted successfully");
    } catch (error) {
      console.error("Error deleting notification:", error);
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }

  static async updateNotification(req, res) {
    const listId = req.params.id;
    try {
      const rowsAffected = await NotificationService.updateOneNotification(
        listId
      );
      if (rowsAffected === 0) {
        return res.status(404).json({
          error: "failed to update the notification",
        });
      }
      res.status(200).json("updated notification successfully");
    } catch (error) {
      console.error("Error updating notification", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = NotificationController;
