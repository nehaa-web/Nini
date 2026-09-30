import 'dotenv/config'
import {ChatGoogleGenerativeAI} from '@langchain/google-genai';
import { ChatGroq } from "@langchain/groq";
import { HumanMessage, AIMessage, SystemMessage } from "@langchain/core/messages";

const geminiModel = new ChatGoogleGenerativeAI({
    model: "gemini-3.5-flash",
    temperature: 0,
    maxRetries: 0
});

const groqModel = new ChatGroq({
    model:  "openai/gpt-oss-120b",
    temperature: 0,
    maxRetries: 0
});

console.log("Loaded Key:", process.env.GEMINI_API_KEY ? "Key Loaded!" : "Key Missing/Undefined!");

// Gemini AI Made Response Generation
export async function generateResponse(messages) {
  const response = await groqModel.invoke([
    new SystemMessage(`You are Nini, an AI assistant.
    Your name is Nini. If anyone asks who you are, always say "I am Nini".
    Never mention GPT, ChatGPT, OpenAI, Llama, Meta, Groq or any other model/company as your identity.`),
    ...messages.map((m) =>
      m.role === "user" ? new HumanMessage(m.content) : new AIMessage(m.content)
    ),
  ]);
  return response.text;
}


export async function generateChatTitle(messages) {
  const response = await groqModel.invoke([
    new SystemMessage(`You are a helpful assistant that generates concise and descriptive titles for chat conversations.
    
    User will provide you with a series of messages from a chat conversation, and you will generate a title that accurately reflects the content and context of the captures the essence of the conversation in a 2-4 word title. Please ensure that the title is relevant, engaging, and provides a clear indication of the conversation's topic. Avoid using generic titles and focus on creating something unique and specific to the conversation provided.`),

    new HumanMessage(`
      Generate a concise and descriptive title for the following chat conversation messages:
      ${messages.map((msg, index) => `Message ${index + 1}: ${msg.content}`).join("\n")}
    `),
  ]);
  return response.text;
}



