import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import useFetchList from "../hooks/useFetchList";
import { setNotifications } from "../Redux/ListSlice";
import { getSocket } from "../socket";


const Notifications = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const token = useSelector((state) => state.auth.isToken);
  const dispatch = useDispatch();

  const {fetchSharedTodoList, fetchNotifications} = useFetchList();
  const notifications = useSelector((state)=> state.todolist.notifications);

  const handleAccept = async (id) => {
    try {
        const response = await axios.patch(`http://localhost:3000/notification/update/${id}`,{},
          {
            headers: {
              Authorization: token,
            },
          }
        );
        await fetchNotifications();
        await fetchSharedTodoList();
      } catch (error) {
      console.error("There was an error updating the notification!", error);
    }
  };

  const handleDelete = async(id)=>{
    try{
        const response = await axios.delete(`http://localhost:3000/notification/delete/${id}`, {
          headers: {
            Authorization: token,
          },
        });
        await fetchNotifications();
    } catch(err){
      console.error("There was an error deleting the notification", err);
    }
  }

  useEffect(() => {
    const socket = getSocket();
    socket.on("notification", (notification) => {
      // Dispatch action to add new notification to the Redux state
      dispatch(setNotifications([...notifications, notification]));
    });
    fetchNotifications();
  }, [notifications]);

  return (
    <div>
      <div className="relative inline-block">
        <button
          className="text-lg text-white"
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
                    <p>Task ID: {notification.id} shared with you</p>
                    <button
                      className="mr-2 bg-green-500 text-white px-2 py-1 rounded"
                      onClick={() => handleAccept(notification.id)}
                    >
                      Accept
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleDelete(notification.id)}
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
