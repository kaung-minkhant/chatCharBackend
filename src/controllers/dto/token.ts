import { z } from "zod";
import { ModelType } from "openai-gpt-token-counter";

export const MessageTypeSchema = z.enum(["user", "assistant", "system"]);
export const ModelTypeSchema = z.enum(
  [
    "gpt-4",
    "gpt-4-0613",
    "gpt-4-32k",
    "gpt-4-32k-0613",
    "gpt-3.5-turbo",
    "gpt-3.5-turbo-16k",
    "gpt-3.5-turbo-0613",
    "gpt-3.5-turbo-16k-0613",
  ],
  {
    required_error:
      'Model Name is required: gpt-4 | gpt-4-0613 | gpt-4-32k | gpt-4-32k-0613 | gpt-3.5-turbo | gpt-3.5-turbo-16k | gpt-3.5-turbo-0613 | gpt-3.5-turbo-16k-0613',
    invalid_type_error: 'Invalid model name: gpt-4 | gpt-4-0613 | gpt-4-32k | gpt-4-32k-0613 | gpt-3.5-turbo | gpt-3.5-turbo-16k | gpt-3.5-turbo-0613 | gpt-3.5-turbo-16k-0613'
  }
);

export const MessageTokenDtoSchema = z.object({
  messages: z.array(
    z.object({
      role: MessageTypeSchema,
      content: z.string(),
    })
  ),
  model: ModelTypeSchema,
});

export type MessageTokenDtoType = z.infer<typeof MessageTokenDtoSchema>;
export type MessageTypeType = z.infer<typeof MessageTypeSchema>;
export type ModelTypeType = z.infer<typeof ModelTypeSchema>;
