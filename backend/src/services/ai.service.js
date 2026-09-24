import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage,SystemMessage } from "@langchain/core/messages"
import { ChatMistralAI } from "@langchain/mistralai";

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

// Gemini AI Made Response Generation
export async function generateResponse(message) {
    const response = await geminiModel.invoke([
      new HumanMessage(message)
    ])     
    return response.text
};
 
// Mistral AI Made Chat Title Generation
export async function generateChatTitle(messages) {

  const response = await mistralModel.invoke([
   new SystemMessage(`You are a helpful assistant that generates concise and descriptive titles for chat conversations.
    
    User will provide you with a series of messages from a chat conversation, and you will generate a title that accurately reflects the content and context of the captures the essence of the conversation in a 2-4 word title. Please ensure that the title is relevant, engaging, and provides a clear indication of the conversation's topic. Avoid using generic titles and focus on creating something unique and specific to the conversation provided.
    `),
   new HumanMessage(`
    Generate a title for the following chat conversation:
    ${messages.map((msg) => `${msg.role}: ${msg.content}`).join("\n")}
   `)

  ])     
  return response.text


}