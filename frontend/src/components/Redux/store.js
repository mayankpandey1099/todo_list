import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthSlice";
import ListReducer from "./ListSlice";

const store = configureStore({
    reducer:{
        auth:AuthReducer,
        todolist: ListReducer,
    }
})

export default store;