import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import  messageSlice  from "./slices/messageSlice";

export const store = configureStore({
  reducer: {
    userInfo : userSlice, 
    selectedUser : messageSlice
  },
});
