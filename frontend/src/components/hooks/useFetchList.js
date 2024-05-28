import React, {useEffect} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import { setLists, setSharedLists } from "../Redux/ListSlice";

const useFetchList = ()=>{
    const token = useSelector((state) => state.auth.isToken); 
    const dispatch = useDispatch();

    const fetchTodos = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/todolist/lists",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        dispatch(setLists(response.data.lists));
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };


    const fetchSharedTodoList = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/sharedtodolist/lists",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        dispatch(setSharedLists(response.data));
      } catch (error) {
        console.error("Error fetching todo list:", error);
      }
    };


    useEffect(()=> {
        fetchTodos();
        fetchSharedTodoList();
    },[]);



    return { fetchTodos, fetchSharedTodoList };
};

export default useFetchList;