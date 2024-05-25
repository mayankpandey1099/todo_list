import React, { useState, useEffect } from "react";
import axios from "axios";
import {useSelector} from "react-redux";
import UserList from "./UserList";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const token = useSelector((state)=> state.auth.isToken);
  const [showUserList, setShowUserList] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(-1);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/todolist/lists",{
        headers: {
          Authorization: token,
        }
      });
      console.log(response.data.lists);
      setTodos(response.data.lists);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/todolist/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleMarkDone = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/todolist/update/${id}`,{},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      fetchTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleShare = (todo) => {
      setCurrentTodo(todo);
      setShowUserList(true);
  };

   useEffect(() => {
      const intervalId = setInterval(fetchTodos, 2000);
      return () => clearInterval(intervalId);
     //fetchTodos();
   }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      {showUserList ? (
        <UserList
          todo={currentTodo}
          closeUserList={() => setShowUserList(false)}
        />
      ) : (
        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center border-b py-2 relative"
            >
              <div>
                <h2 className="text-xl font-semibold mb-2">{todo.title}</h2>
                <p className="text-gray-700">{todo.description}</p>
                {todo.markedDone ? (
                  <p className="text-green-500">Completed</p>
                ) : (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                    onClick={() => handleMarkDone(todo.id)}
                  >
                    Mark as Done
                  </button>
                )}
              </div>
              <div>
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                  onClick={() => handleShare(todo)}
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
    </div>
  );
}
export default TodoList;

