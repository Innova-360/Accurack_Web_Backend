"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatController = void 0;
const openai_1 = require("openai");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const openai = new openai_1.OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
const chatController = async (req, res) => {
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
    }
    catch (err) {
        console.error('❌ OpenAI error:', err?.message || err);
        res.status(500).json({ error: 'OpenAI request failed' });
    }
};
exports.chatController = chatController;
