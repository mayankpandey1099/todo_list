import { createSlice } from "@reduxjs/toolkit";

const listSlice = createSlice({
  name: "list",
  initialState: {
    lists: [],
    currentPages: 1,
    totalPages: 1,
    listId: null
  },
  reducers: {
    setLists: (state, action) => {
      state.lists = action.payload;
    },
    setCurrentPages: (state, action) => {
      state.currentPages = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setListId: (state, action) => {
      state.listId = action.payload;
    }
  },
});

export const { setLists, setCurrentPages, setTotalPages, setListId } = listSlice.actions;
export default listSlice.reducer;
