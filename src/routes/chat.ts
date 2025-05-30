import express from 'express';
import type { Request, Response } from 'express';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

router.post('/', async (req: Request, res: Response) => {
    const { message } = req.body;

    if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'message must be a string' });
    }

    console.log('🟢 Incoming message:', message);

    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content: "You are AccuRack Assistant, a helpful smart assistant specialized in inventory management for small businesses.Help users with tracking supplies, tools, and materials.",
                },
                {
                    role: 'user',
                    content: message,
                },
            ],
        });

        const reply = completion.choices[0].message.content;
        console.log('✅ OpenAI reply:', reply);
        res.json({ reply });
    } catch (err: any) {
        console.error('❌ OpenAI error:', err?.message || err);
        res.status(500).json({ error: 'OpenAI request failed' });
    }
});

export default router;