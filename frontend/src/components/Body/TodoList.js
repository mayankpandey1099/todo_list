
import React, { useState, useEffect } from "react";
import axios from "axios";
import {useSelector} from "react-redux";

const ToDoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState(null);
  const [users, setUsers] = useState([]);
  const token = useSelector((state) => state.auth.isToken);
  console.log(token);

  // useEffect(() => {
  //   const intervalId = setInterval(fetchTodos, 2000);
  //   return () => clearInterval(intervalId);
  // }, []);
  

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/list/lists", {
        headers: {
          Authorization: token,
        },
      });
      setTodos(response.data.lists);
    } catch (error) {
      console.error("There was an error fetching the to-dos!", error);
    } finally {
      setLoading(false);
    }
  };

   const fetchUsers = async () => {
     try {
       const response = await axios.get("http://localhost:3000/shared/users", {
         headers: {
           Authorization: token,
         },
       });
       setUsers(response.data.users);
     } catch (error) {
       console.error("There was an error fetching users!", error);
     }
   };

   const handleShare = async (id) => {
     setSelectedTodoId(id);
     await fetchUsers();
     setShowShareModal(true);
   };

   const handleShareWithUser = async (userId) => {
     try {
       await axios.post(
         `http://localhost:3000/share/${selectedTodoId}`,
         { userId },
         {
           headers: {
             Authorization: token,
           },
         }
       );
       console.log(`Todo item shared successfully with user ID ${userId}!`);
       setShowShareModal(false);
     } catch (error) {
       console.error("Error sharing todo item:", error);
     }
   };


  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/list/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      // Update todos state by filtering out the deleted todo
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      console.log(`Todo item with ID ${id} deleted successfully!`);
    } catch (error) {
      console.error("Error deleting todo item:", error);
    }
  };

  const handleMarkAsDone = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/list/${id}`, {},{
        headers: {
          Authorization: token,
        },
      });
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, markedDone: true } : todo
        )
      );
      console.log(`Todo item with ID ${id} marked as done successfully!`);
    } catch (error) {
      console.error("Error marking todo item as done:", error);
    }
  };


  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="max-w-md mx-auto px-4 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center border-b py-2"
            >
              <div>
                <h2 className="text-xl font-semibold mb-2">{todo.title}</h2>
                <p className="text-gray-700">{todo.description}</p>
                {todo.markedDone ? (
                  <p className="text-green-500">Completed</p>
                ) : (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                    onClick={() => handleMarkAsDone(todo.id)}
                  >
                    Mark as Done
                  </button>
                )}
              </div>
              <div>
                <button
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                  onClick={() => handleShare(todo.id)}
                >
                  Share
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => handleDelete(todo.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {showShareModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-lg font-semibold mb-4">Share with:</h2>
            <ul>
              {users.map((user) => (
                <li
                  key={user.id}
                  className="cursor-pointer text-blue-500 hover:text-blue-700 mb-2"
                  onClick={() => handleShareWithUser(user.id)}
                >
                  {user.name}
                </li>
              ))}
            </ul>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setShowShareModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default ToDoList;
