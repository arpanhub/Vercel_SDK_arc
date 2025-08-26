import dotenv from 'dotenv';
dotenv.config();
import { openai } from '@ai-sdk/openai';
import {streamText} from 'ai';
import { generateText } from 'ai';

const model = openai('gpt-3.5-turbo');
export const answerMyQuestion = async (prompt: string) => {
  const { textStream } =  streamText({
    model,
    prompt
  });
//   const { text } = await generateText({
//     model,
//     prompt
//   });
//   return text;
  for await (const textPart of textStream) {
    // console.log(textPart);
    process.stdout.write(textPart);
  }
};

await answerMyQuestion("what is land?");