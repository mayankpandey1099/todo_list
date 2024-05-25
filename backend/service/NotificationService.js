const SharedList = require("../model/SharedList");

class NotificationService {

    static async findAllNotification(userId) {
        try{
            const notifications = await SharedList.findAll({
            where: {isAdded: false, userId: userId},
            attributes: ["id", "title", "description", "isAdded"],
            });
            return notifications;
        } catch(err){
            console.error("Error fetching notifications:", err);
            throw new Error("Failed to fetch notifications");
        }
    }

    static async deleteOneNotification(listId, userId){
        try{
            const rowsAffected = await SharedList.destroy({
            where: {id: listId, isAdded: false, userId: userId},
            });
            return rowsAffected;
        } catch(err){
            console.error("Error deleting notification:", err);
            throw new Error("Failed to delete notification");   
        }
    }

    static async updateOneNotification(listId) {
        try{
            const [rowsAffected] = await SharedList.update(
              { isAdded: true },{where: {id: listId}
            });
            return rowsAffected;
        } catch(err){
            console.error("Error updating notifications:", err);
            throw new Error("Failed to update notification");    
        }
    }

}

module.exports = NotificationService;