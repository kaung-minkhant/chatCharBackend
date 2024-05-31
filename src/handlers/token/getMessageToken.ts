import openaiTokenCounter, { ModelType } from "openai-gpt-token-counter";
import { HandlerReturnObject } from "../types";

type Messages = {
  role: "user" | "assistant" | "system";
  content: string;
}[];

export const getMessageToken = (messages: Messages, model: ModelType) => {
  const response: HandlerReturnObject = {
    code: 200,
    data: null,
    error: null,
  };
  try {
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
