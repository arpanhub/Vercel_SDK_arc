import express from 'express';
import cors from 'cors';
import chatRouter from '../src/routes/chat.ts';
import dotenv from 'dotenv';
import { openai } from '@ai-sdk/openai';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api', chatRouter);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


