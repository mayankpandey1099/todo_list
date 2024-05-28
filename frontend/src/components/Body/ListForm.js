import React, { useState } from "react";
import axios from "axios";
import {useSelector} from "react-redux";
import useFetchList from "../hooks/useFetchList";

const ListForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const {fetchTodos} = useFetchList();

  const token = useSelector((state)=> state.auth.isToken);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/todolist",
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      await fetchTodos();
    } catch (error) {
      console.error("There was an error creating the to-do!", error);
    }
    setTitle("");
    setDescription("");
  };
  return (
    <div className="w-96 mx-auto p-4 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">Create a To-Do</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Title:
          </label>
          <input
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description:
          </label>
          <textarea
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Add To-Do
        </button>
      </form>
    </div>
  );
};

export default ListForm;
