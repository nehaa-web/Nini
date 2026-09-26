import { initializeSocket } from "../service/chat.socket.js";
import { useDispatch } from "react-redux";
import {
  sendMessage,
  getChatMessages,
  getMessages,
  DeleteChat,
} from "../service/chat.api.js";
import {
  setChat,
  setCurrentChatId,
  setError,
  setIsLoading,
} from "../chat.slice.js";
import { setLoading } from "../../auth/auth.slice.js";

export const useChat = () => {
  const dispatch = useDispatch();

  async function handleSetMessage({ message, chatId }) {
    dispatch(setLoading(true));

    const data = await sendMessage({ message, chatId });
    const { chat, aiMessage } = data;

    dispatch(
      setChat((prev) => {
        return {
          ...prev,
          [chat.title]: {
            chat: {
              ...chat,
              messages: [{ content: message, role: "user" }, aiMessage],
            },
          },
        };
      }),
    );
    dispatch(setCurrentChatId(chat._id));
  }

  return {
    initializeSocket,
    handleSetMessage,
  };
};
