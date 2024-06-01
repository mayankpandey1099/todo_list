import {createSlice} from "@reduxjs/toolkit";

const listSlice = createSlice({
    name: "todolist",
    initialState: {
        lists: [],
        sharedLists:[],
        notifications:[],
    },
    reducers: {
        setLists: (state, action)=>{
            state.lists = action.payload;
        },
        setSharedLists: (state, action)=>{
            state.sharedLists = action.payload;
        },
        setNotifications: (state, action)=>{
            state.notifications = action.payload;
        }
    }
});

export const{setLists, setSharedLists, setNotifications} = listSlice.actions;
export default listSlice.reducer;
