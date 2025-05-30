// src/index.ts
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import chatRouter from './routes/chat';
import leadsRouter from './routes/leads';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/chatbot', chatRouter);
app.use('/api/leads', leadsRouter); // 👈 Mount the leads router

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ AccuRack backend running at http://localhost:${PORT}`);
});
