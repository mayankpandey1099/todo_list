import React, { useState, useEffect } from "react";
import axios from "axios";
import {useSelector} from "react-redux";
import useFetchList from "../hooks/useFetchList";

const SharedList = () => {
  const token = useSelector((state)=> state.auth.isToken);
  const sharedLists = useSelector((state)=> state.todolist.sharedLists);
  const {fetchSharedTodoList} = useFetchList();
  
  

  const handleDelete = async (id) => {
    try{
    const response = await axios.delete(`http://localhost:3000/sharedtodolist/delete/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      await fetchSharedTodoList();
    } catch(error){
      console.error("Error deleting todo:", error)
    };
  };


  const handleMarkAsRead = async (id) => {
    try{
    const response = await axios.patch(`http://localhost:3000/sharedtodolist/update/${id}`, {}, {
        headers: {
          Authorization: token,
        },
      })
      await fetchSharedTodoList();
    } catch(error){
      console.error("Error marking todo as read:", error)
    };
  };

  useEffect(() => {
    fetchSharedTodoList();
  }, []);


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shared Todo List</h1>
      <ul>
        {sharedLists.map((todo) => (
          <li
            key={todo.id}
            className="flex w-96 justify-between items-center border-b py-2"
          >
            <div>
              <h2 className="text-xl font-semibold mb-2">{todo.title}</h2>
              <p className="text-gray-700">{todo.description}</p>
              {todo.markedDone ? (
                <p className="text-green-500">Completed</p>
              ) : (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() => handleMarkAsRead(todo.id)}
                >
                  Mark as Done
                </button>
              )}
            </div>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleDelete(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SharedList;
