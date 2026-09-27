import { initializeSocket } from "../service/chat.socket.js";
import { useDispatch } from "react-redux";
import { sendMessage, getChatMessages, getMessages, DeleteChat} from "../service/chat.api.js";
import { setChat, setCurrentChatId, setError, setIsLoading , createNewChat , addNewMessage  } from "../chat.slice.js";
import { setLoading } from "../../auth/auth.slice.js";


export const useChat = () => {
  const dispatch = useDispatch();

  async function handleSetMessage({ message, chatId }) {
    dispatch(setLoading(true));
    const data = await sendMessage({ message, chatId });
    const { chat, aiMessage } = data;
     dispatch(addNewMessage({
    chatId: chat._id ,
    content: aiMessage.content,
    role: "user",
    }))
    dispatch(addNewMessage({
    chatId: chat._id ,
    content: aiMessage.content,
    role: aiMessage.role,
    }))
    dispatch(setCurrentChatId(chat._id))
  }

  return {
    initializeSocket,
    handleSetMessage,
  };
};
