import { generateResponse , generateChatTitle } from '../services/ai.service.js';


export async function sendMessage(req, res) {

    const { message } = req.body;
    
    const result = await generateResponse(message);
    const title = await generateChatTitle(message);

    console.log(title)

    res.json({
        aiMessage: result,
        chatTitle: title
    })
}