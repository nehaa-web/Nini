import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({

  name: 'chat',

  initialState: {
  chat:  {},
  currentChatId: null,
  isLoading: false,
  error: null,
  },

  reducers: {

  createNewChat: (state, action) => {
  const { chatId, title } = action.payload;
  
  state.chat[chatId] = {
    id: chatId,
    title,
    messages: [],
    lastUpdated: new Date().toISOString(),
  };
  
  // state.currentChatId = chatId;
},
addNewMessage: ( state , action)=> {
  const { chatId , content , role } = action.payload
  state.chat[ chatId].messages.push({ content , role })
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
    }
}

});

export const { setChat, setCurrentChatId, setIsLoading, setError , createNewChat , addNewMessage } = chatSlice.actions;

export default chatSlice.reducer;