import { generateResponse, generateChatTitle } from "../services/ai.service.js";
import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";

export async function sendMessage(req, res) {
  try {
    const { message, chat: chatId } = req.body;

    let title = null;
    let chat = null;

    if (!chatId) {
      title = await generateChatTitle([{ role: "user", content: message }]);
      chat = await chatModel.create({ user: req.user.id, title });
    } else {
      chat = await chatModel.findOne({ _id: chatId, user: req.user.id });
    }

    if (!chat) {
      return res.status(404).json({ success: false, message: "Chat not found" });
    }

    const userMessage = await messageModel.create({
      chat: chat._id,
      content: message,
      role: "user",
    });

    const history = await messageModel.find({ chat: chat._id }).sort({ createdAt: 1 });
    const result = await generateResponse(history);

    const aiMessage = await messageModel.create({
      chat: chat._id,
      content: result,
      role: "ai",
    });

    return res.status(201).json({ success: true, title, chat, userMessage, aiMessage });
  } catch (err) {
    console.error("sendMessage error:", err);
    return res.status(err.status || 500).json({ success: false, message: err.message });
  }
}

export async function getChatMessages(req, res) {
  const chats = await chatModel.find({ user: req.user.id }).sort({ updatedAt: -1 });

  res.status(200).json({
    message: "Chats retrieved successfully",
    success: true,
    chats,
  });
}

export async function getMessages(req, res) {
  const { chatId } = req.params;

  const foundChat = await chatModel.findOne({ _id: chatId, user: req.user.id });

  if (!foundChat) {
    return res.status(404).json({ message: "Chat not found", success: false });
  }

  const messages = await messageModel.find({ chat: chatId }).sort({ createdAt: 1 });

  res.status(200).json({
    message: "Messages retrieved successfully",
    success: true,
    messages,
  });
}

export async function DeleteChat(req, res) {
  const { chatId } = req.params;

  const deletedChat = await chatModel.findOneAndDelete({ _id: chatId, user: req.user.id });

  if (!deletedChat) {
    return res.status(404).json({ message: "Chat not found", success: false });
  }

  await messageModel.deleteMany({ chat: chatId });

  res.status(200).json({ message: "Chat deleted successfully", success: true });
}
