import React from "react";
import TodoList from "./TodoList";
import SharedTodoList from "./SharedTodoList";
import ListForm from "./ListForm";
const Home = () => {
  return (
    <div className="flex flex-col items-center h-screen">
      <div className="flex flex-row justify-between w-3/4 m-12">
        <div className="mr-2">
          <ListForm />
        </div>
        <div className="ml-2">
          <TodoList />
        </div>
      </div>
      <div className="mt-4">
        <SharedTodoList />
      </div>
    </div>
  );
};

export default Home;
