import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/chat",
  withCredentials: true,
});

export const sendMessage = async ({ chatId, message }) => {
  const response = await api.post("/message", { message, chat: chatId });
  return response.data;
};

export const getChatMessages = async (chatId) => {
  const response = await api.get(`/${chatId}/messages`);
  return response.data;
};

export const getMessages = async () => {
  const response = await api.get("/");
  return response.data;
};

export const DeleteChat = async (chatId) => {
  const response = await api.delete(`/${chatId}`);
  return response.data;
};
