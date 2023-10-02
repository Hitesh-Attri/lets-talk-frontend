import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  selectedChat: null,
  chats: [],
  notifications: [],
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
  },
});

export const { setUser, setSelectedChat, setChats, setNotifications } =
  counterSlice.actions;

export default counterSlice.reducer;
