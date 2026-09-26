import { Router } from "express";
import { sendMessage , getChatMessages , getMessages , DeleteChat} from "../controllers/chat.controller.js";
import { authUser } from "../middleware/auth.middleware.js";

const chatRouter = Router();

chatRouter.post("/message", authUser, sendMessage);
chatRouter.get("/", authUser, getChatMessages);
chatRouter.get("/:chatId/messages", authUser, getMessages);
chatRouter.delete("/:chatId", authUser, DeleteChat);

export default chatRouter;