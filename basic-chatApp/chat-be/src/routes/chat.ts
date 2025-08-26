// src/routes/chat.ts
import express from 'express';
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { tools } from '../tools/index.ts'; // your ping/getCurrentTime/calculator

const router = express.Router();

router.post('/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    if (!Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid messages format' });
    }

    const result = await generateText({
      // model: openai.responses('gpt-4o'),
      model: openai.responses('gpt-5-mini'),
      messages,
      tools,                 
      maxToolRoundtrips: 3,  
    });

    return res.json({ text: result.text, toolCalls: result.toolCalls, toolResults: result.toolResults });
  } catch (error) {
    console.error('Chat API error:', error);
    if (!res.headersSent) {
      return res.status(500).json({ error: 'Internal server error' });
    }
    try { res.end(); } catch {}
  }
});

export default router;
