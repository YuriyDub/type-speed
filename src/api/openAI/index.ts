import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface GenerateRandomSentenceResponse {
  choices: { text: string }[];
}

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const openAiApi = createApi({
  reducerPath: "openAiApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.openai.com/v1/" }),
  endpoints: (builder) => ({
    generateRandomSentence: builder.query<GenerateRandomSentenceResponse, void>(
      {
        query: () => ({
          url: "engines/gpt-3.5-turbo-1106/completions",
          method: "POST",
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        }),
      }
    ),
  }),
});

export const { useGenerateRandomSentenceQuery } = openAiApi;

export default openAiApi;
