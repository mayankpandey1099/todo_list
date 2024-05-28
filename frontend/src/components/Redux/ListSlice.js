import {createSlice} from "@reduxjs/toolkit";

const listSlice = createSlice({
    name: "todolist",
    initialState: {
        lists: [],
        sharedLists:[],
    },
    reducers: {
        setLists: (state, action)=>{
            state.lists = action.payload;
        },
        setSharedLists: (state, action)=>{
            state.sharedLists = action.payload;
        }
    }
});

export const{setLists, setSharedLists} = listSlice.actions;
export default listSlice.reducer;
