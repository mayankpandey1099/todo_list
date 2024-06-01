
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import { setLists, setSharedLists } from "../Redux/ListSlice";
import { setNotifications } from "../Redux/ListSlice";

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

    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/notification/lists",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        dispatch(setNotifications(response.data));
      } catch (error) {
        console.error("There was an error fetching notifications!", error);
      }
    };

    return { fetchTodos, fetchSharedTodoList, fetchNotifications };
};

export default useFetchList;