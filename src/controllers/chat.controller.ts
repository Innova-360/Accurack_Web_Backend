
import express from 'express';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';

type Request = express.Request;
type Response = express.Response;


dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const chatController = async (req: Request, res: Response) => {
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
                    content: `You're Sam, a friendly and casual AI assistant for Accurack, an inventory management system. Keep your replies short, natural, and conversational — like a human teammate, not a corporate bot.If the user wants to schedule a demo, let the frontend handle the booking flow. Just reply with: "I'd be happy to help schedule a demo. What's your name?Don't explain the steps, don't give instructions — keep it smooth and chill.`,
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


}

