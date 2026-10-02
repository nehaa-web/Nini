import { tavily as Tavily } from "@tavily/core";

const tvly = Tavily({
  apiKey: process.env.TAVILY_API_KEY,
});

export const searchInternet = async ({query}) => {
    const result = await tavily.search(query, {
        maxResults: 5,
        searchDepth: "advanced",
    });
    return JSON.stringify(result, null, 2);
}