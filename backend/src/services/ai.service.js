import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage } from "langchain/schema";
import { ChatMistralAI } from "@langchain/mistral";

// Gemini Model Configuration
const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-3.7-flash",
  apiKey: process.env.GEMINI_API_KEY
});

// Mistral Model Configuration
const mistralModel = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY
});

// AI Made Response Generation
export async function generateResponse(message) {
    const response = await geminiModel.invoke([
      new HumanMessage(message)
    ])     
    return response.text
};
 
// AI Made Chat Title Generation
export async function generateChatTitle(messages) {



}