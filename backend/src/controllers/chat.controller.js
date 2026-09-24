import { generateResponse , generateChatTitle } from '../services/ai.service.js';
import chatModel from '../models/chat.model.js';
import messageModel from '../models/message.model.js';

export async function sendMessage(req, res) {

    const { message } = req.body;
    
    const title = await generateChatTitle(message);
    const result = await generateResponse(message);

    const chat = await chatModel.create({
        userId: req.user.id,
        title
    });

const aiMessage = await messageModel.create({
        chat : chat._id,
        content : result,
        role : "ai"
    });

    res.json({
        aiMessage: result,
        title,
        chat,
        aiMessage,
    })


}