import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-3.7-flash",
  apiKey: process.env.GEMINI_API_KEY
});

export async function testApi(req, res) {
    model.invoke("Hello, how are you?")
    .then((response) => {
     console.log(response.text);
    })       
};
 