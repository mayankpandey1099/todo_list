import { createSlice } from "@reduxjs/toolkit";


const modalSlice = createSlice({
  name: "modal",
  initialState : {
  showModalSignin: false,
  showModalSignup: false,
  showModalUpdate: false,
  },
  reducers: {
    setModalStateSignin: (state, action) => {
      state.showModalSignin = action.payload;
    },
    setModalStateSignup: (state, action) =>{
        state.showModalSignup = action.payload;
    },
    setModalStateUpdate: (state, action) => {
      state.showModalUpdate = action.payload;
    }
  },
});

export const { setModalStateSignin, setModalStateSignup, setModalStateUpdate } = modalSlice.actions;
export default modalSlice.reducer;
