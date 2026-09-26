import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, SystemMessage } from "langchain";
import { ChatMistralAI } from "@langchain/mistralai";

// Gemini Model Configuration
const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-3.7-flash",
  apiKey: process.env.GEMINI_API_KEY,
}).withRetry({ stopAfterAttempt: 3 }); 

// Mistral Model Configuration
const mistralModel = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY,
}).withRetry({ stopAfterAttempt: 3 }); 


// Gemini AI Made Response Generation
export async function generateResponse(message) {

  const response = await geminiModel.invoke([
    new HumanMessage(message)]);
  return response.text;
}

// Mistral AI Made Chat Title Generation (with Gemini fallback)
export async function generateChatTitle(messages) {
  const response = await mistralModel.invoke([
    new SystemMessage(`You are a helpful assistant that generates concise and descriptive titles for chat conversations.
    
    User will provide you with a series of messages from a chat conversation, and you will generate a title that accurately reflects the content and context of the captures the essence of the conversation in a 2-4 word title. Please ensure that the title is relevant, engaging, and provides a clear indication of the conversation's topic. Avoid using generic titles and focus on creating something unique and specific to the conversation provided.`),

    new HumanMessage(`
      Generate a concise and descriptive title for the following chat conversation messages:
      ${messages.map((msg, index) => `Message ${index + 1}: ${msg.content}`).join("\n")}
    `),
  ]);
  return response.text;
}

// export async function generateChatTitle(messages) {

//   let messageList;
//   if (Array.isArray(messages)) {
//     messageList = messages;
//   } else if (typeof messages === "string") {
//     messageList = [{ role: "user", content: messages }];
//   } else if (messages && typeof messages === "object") {
//     messageList = [messages];
//   } else {
//     throw new Error(
//       `generateChatTitle expected an array, object, or string but got: ${typeof messages}`
//     );
//   }

//   const conversationText = messageList
//     .map((m) => {
//       const role = m.role ?? "user";
//       const content = typeof m.content === "string" ? m.content : m.text ?? "";
//       return `${role}: ${content}`;
//     })
//     .join("\n");

//   const systemPrompt = new SystemMessage(
//     `You are a helpful assistant that generates concise and descriptive titles for chat conversations. Given a series of messages, produce a specific, relevant 2-4 word title. Avoid generic titles.`
//   );
//   const humanPrompt = new HumanMessage(
//     `Generate a title for this conversation:\n${conversationText}`
//   );

//   try {
//     const response = await mistralModel.invoke([systemPrompt, humanPrompt]);
//     return response.text;
//   } catch (err) {
//     const response = await geminiModel.invoke([systemPrompt, humanPrompt]);
//     return response.text;
//   }
// }


// export async function generateResponse(message) {
//   try {
//     const response = await geminiModel.invoke([new HumanMessage(message)]);
//     return response.text;
//   } catch (err) {
//     const response = await mistralModel.invoke([new HumanMessage(message)]);
//     return response.text;
//   }
// }