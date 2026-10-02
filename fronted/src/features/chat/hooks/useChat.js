import { initializeSocket } from "../service/chat.socket.js";
import { useDispatch } from "react-redux";
import {
  sendMessage,
  getChatMessages,
  getMessages,
} from "../service/chat.api.js";
import {
  setChat,
  setCurrentChatId,
  setError,
  setIsLoading,
  createNewChat,
  addNewMessage,
  setChatMessages,
} from "../chat.slice.js";

export const useChat = () => {
  const dispatch = useDispatch();

  async function handleSetMessage({ message, chatId }) {
    try {
      dispatch(setIsLoading(true));
      const data = await sendMessage({ message, chatId });
      const { chat, userMessage, aiMessage } = data;

      if (!chatId) {
        dispatch(createNewChat({ chat }));
      }
      dispatch(setCurrentChatId(chat._id));

      dispatch(
        addNewMessage({
          chatId: chat._id,
          content: userMessage.content,
          role: userMessage.role,
        }),
      );

      dispatch(
        addNewMessage({
          chatId: chat._id,
          content: aiMessage.content,
          role: aiMessage.role,
        }),
      );
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setIsLoading(false));
    }
  }

  // NEW: sidebar ki real history
  async function handleGetChats() {
    try {
      const data = await getMessages();
      const list = data.chats || data;
      const chatsObj = {};
      list.forEach((c) => {
        chatsObj[c._id] = { ...c, messages: [] };
      });
      dispatch(setChat(chatsObj));
    } catch (error) {
      console.error("Failed to load chats:", error);
    }
  }

  // NEW: sidebar me chat pe click karne par uske messages load
  async function handleOpenChat(chatId) {
    try {
      dispatch(setCurrentChatId(chatId));
      const data = await getChatMessages(chatId);
      dispatch(setChatMessages({ chatId, messages: data.messages || data }));
    } catch (error) {
      console.error("Failed to open chat:", error);
    }
  }

  return {
    initializeSocket,
    handleSetMessage,
    handleGetChats,
    handleOpenChat,
  };
};
