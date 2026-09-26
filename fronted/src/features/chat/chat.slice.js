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

export const { setChat, setCurrentChatId, setIsLoading, setError } = chatSlice.actions;

export default chatSlice.reducer;