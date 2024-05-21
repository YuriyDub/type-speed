import Anthropic from "@anthropic-ai/sdk";

const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;

const anthropic = new Anthropic({
  apiKey: API_KEY,
});

export async function generateRandomSentenceQuery() {
  const message = await anthropic.messages.create({
    max_tokens: 1024,
    messages: [
      { role: "user", content: "Hello, Claude, generate random sentence" },
    ],
    model: "claude-3-opus-20240229",
  });

  return message.content;
}
