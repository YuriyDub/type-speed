import { CohereClient } from "cohere-ai";

const API_KEY = import.meta.env.VITE_COHERE_API_KEY;

const cohere = new CohereClient({
  token: API_KEY,
});

export async function generateRandomSentenceQuery() {
  const prediction = await cohere.generate({
    model: "command",
    prompt: "Generate new random one line sentence, only sentence",
    maxTokens: 300,
    temperature: 0.9,
    k: 0,
    stopSequences: [],
    returnLikelihoods: "NONE",
  });

  const regex = /"([^"]+)"/g;
  let match;

  while ((match = regex.exec(prediction.generations[0].text)) !== null) {
    return match[1];
  }
}
