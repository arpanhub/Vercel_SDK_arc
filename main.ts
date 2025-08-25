import dotenv from 'dotenv';
dotenv.config();
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

const model = openai('gpt-3.5-turbo');
export const answerMyQuestion = async (prompt: string) => {
  const { text } = await generateText({
    model,
    prompt
  });
  return text;
};

const answer = await answerMyQuestion("what is land?");
console.log(answer);