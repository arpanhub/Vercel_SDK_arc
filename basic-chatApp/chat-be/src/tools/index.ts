import { tool } from 'ai';
import { z } from 'zod';

export const ping = tool({
  description: 'Ping tool',
  inputSchema: z.object({}), 
  execute: async () => ({ ok: true }),
});

export const getCurrentTime = tool({
  description: 'Get the current time',
  inputSchema: z.object({
    timezone: z.string().optional().describe('Timezone (optional)'),
  }),
  execute: async ({ timezone }) => {
    const now = new Date();
    const currentTime = timezone
      ? now.toLocaleString('en-US', { timeZone: timezone })
      : now.toLocaleString();
    const systemTZ = Intl.DateTimeFormat().resolvedOptions().timeZone ?? 'UTC';
    return { currentTime, timezone: timezone ?? systemTZ };
  },
});

export const calculator = tool({
  description: 'Perform basic maths',
  inputSchema: z.object({
    operation: z.enum(['add', 'subtract', 'multiply', 'divide']),
    a: z.number().describe('First number'),
    b: z.number().describe('Second number'),
  }),
  execute: async ({ operation, a, b }) => {
    let results: number;
    if (operation === 'add') results = a + b;
    else if (operation === 'subtract') results = a - b;
    else if (operation === 'multiply') results = a * b;
    else if (operation === 'divide') results = a / b;
    else throw new Error('Invalid operation');

    return { results, operation, inputs: { a, b } };
  },
});

export const tools = {
  ping,
  getCurrentTime,
  calculator,
};
