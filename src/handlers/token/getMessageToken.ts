import openaiTokenCounter, { ModelType } from "openai-gpt-token-counter";
import { HandlerReturnObject } from "../types";

type Messages = {
  role: "user" | "assistant" | "system";
  content: string;
}[];

export const getMessageToken = (messages: Messages, model: ModelType | 'gpt-4o') => {
  const response: HandlerReturnObject = {
    code: 200,
    data: null,
    error: null,
  };
  try {
    if (model === 'gpt-4o') model = 'gpt-4'
    const tokenCount = openaiTokenCounter.chat(messages, model);
    response.data = {
      promptTokens: 0,
      completionTokens: 0,
      totalTokens: tokenCount
    }
    return response
  } catch (error: any) {
    response.code = 500;
    response.error = error.message;
    return response
  }
};
