import { generateResponse, generateChatTitle } from "../services/ai.service.js";
import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";

export async function sendMessage(req, res) {
  const { message, chat: chatId } = req.body;

  let title = null, chat = null;

if (!chatId) {
  title = await generateChatTitle(message);

  chat = await chatModel.create({
    userId: req.user.id,
    title,
  });
} 
// else {
//   chat = await chatModel.findById(chatId);
// }

  const userMessage = await messageModel.create({
    chat: chat._id,
    content: message,
    role: "user",
  });

  const messages = await messageModel.find({ chat: chatId || chat._id});

  const result = await generateResponse(message);

  const aiMessage = await messageModel.create({
    chat: chat || chat._id,
    content: result,
    role: "ai",
  });

  res.status(201).json({
    aiMessage: result,
    title,
    chat,
    aiMessage,
  });
}

export async function getChatMessages(req, res) {
   const user = req.user
   const chats = await chatModel.find({ userId : user.id })

   res.status(200).json({
    message: "Chat messages retrieved successfully",
    success: true,
    chats
   })
}

export async function getMessages(req, res) {
  const { chatId } = req.params;

  const chat = await chatModel.findOne({
    _id: chatId,
    userId: req.user.id,
  });

  if(!chat) {
    return res.status(404).json({
      message: "Chat not found",
      success: false,
      err: "Chat not found",
    });
  }

  const messages = await messageModel.find({ chat: chatId });

  res.status(200).json({
    message: "Messages retrieved successfully",
    success: true,
    messages
  });
}

export async function DeleteChat(req, res) {
  const { chatId } = req.params;

  const chat = await chatModel.findOneAndDelete({
    _id: chatId,
    userId: req.user.id,
  });

  if (!chat) {
    return res.status(404).json({
      message: "Chat not found",
      success: false,
      err: "Chat not found",
    });
  }

  await messageModel.deleteMany({ chat: chatId });

  res.status(200).json({
    message: "Chat deleted successfully",
    success: true,
  });
}