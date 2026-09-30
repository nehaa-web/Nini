import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chat: {},
    currentChatId: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    createNewChat: (state, action) => {
      const { chat } = action.payload;
      if (!state.chat[chat._id]) {
        state.chat[chat._id] = { ...chat, messages: [] };
      }
    },
    addNewMessage: (state, action) => {
      const { chatId, content, role } = action.payload;
      if (!state.chat[chatId]) {
        state.chat[chatId] = { _id: chatId, title: "New chat", messages: [] };
      }
      state.chat[chatId].messages.push({ content, role });
    },
    setChatMessages: (state, action) => {
      const { chatId, messages } = action.payload;
      if (!state.chat[chatId]) {
        state.chat[chatId] = { _id: chatId, title: "New chat", messages: [] };
      }
      state.chat[chatId].messages = messages;
    },
    setChat: (state, action) => {
      state.chat = action.payload;
    },
    setCurrentChatId: (state, action) => {
      state.currentChatId = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setChat,
  setCurrentChatId,
  setIsLoading,
  setError,
  createNewChat,
  addNewMessage,
  setChatMessages,
} = chatSlice.actions;

export default chatSlice.reducer;
