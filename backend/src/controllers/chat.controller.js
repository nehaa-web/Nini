import { generateResponse } from '../services/ai.service.js';


export async function sendMessage(req, res) {

    const { message } = req.body;
    
    const result = await generateResponse(message);

    res.json({
        response: result
    })
}