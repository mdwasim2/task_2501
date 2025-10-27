import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value:  "" ,
};

export const messageSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    selecteduser: (state, action) => {
      state.value= action.payload; 
    },
 
  },
});

// Action creators are generated for each case reducer function
export const { selecteduser } = messageSlice.actions;

export default messageSlice.reducer;
