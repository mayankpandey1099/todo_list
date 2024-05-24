import React, { useState, useEffect } from "react";
import axios from "axios";

const Notifications = ({ user }) => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get("http://localhost:3000/shared/notify", {
        params: { user },
      });
      setNotifications(response.data);
    } catch (error) {
      console.error("There was an error fetching notifications!", error);
    }
  };

  const handleAction = async (id, status) => {
    try {
      await axios.post(`http://localhost:3000/shared/notify/${id}`, {
        status,
      });
      fetchNotifications(); // Refresh notifications after action
    } catch (error) {
      console.error("There was an error updating the notification!", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div>
      <div className="relative inline-block">
        <button
          className="text-xl font-bold"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          Notifications
          {notifications.length > 0 && (
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          )}
        </button>
        {showNotifications && (
          <div className="absolute z-10 right-0 mt-2 w-64 bg-white border border-gray-200 rounded shadow-lg">
            {notifications.length === 0 ? (
              <p className="p-2">No notifications</p>
            ) : (
              <ul>
                {notifications.map((notification) => (
                  <li
                    key={notification.id}
                    className="p-2 border-b border-gray-200"
                  >
                    <p>Task ID: {notification.taskId} shared with you</p>
                    <button
                      className="mr-2 bg-green-500 text-white px-2 py-1 rounded"
                      onClick={() => handleAction(notification.id, "accepted")}
                    >
                      Accept
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleAction(notification.id, "declined")}
                    >
                      Decline
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
