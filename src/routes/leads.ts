import express from 'express';
import axios from 'axios';
import type { Request, Response } from 'express';

const router = express.Router();
const leads: any[] = [];


router.post('/', async (req: Request, res: Response) => {
    const { name, phone, countryCode, businessName, industry, address, email } = req.body;

    if (!name || !phone || !countryCode || !businessName || !industry || !address || !email) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const newLead = {
        id: leads.length + 1,
        name,
        phone,
        countryCode,
        businessName,
        industry,
        address,
        email,
        createdAt: new Date().toISOString(),
    };

    leads.push(newLead);
    console.log('🟢 New Lead:', newLead);

    try {
        await axios.post(process.env.GOOGLE_SHEETS_WEBHOOK_URL!, newLead, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('✅ Sent to Google Sheets!');
    } catch (err: any) {
        console.error('❌ Failed to send to Google Sheets:', err?.message || err);
    }

    res.status(201).json({ message: 'Lead captured successfully', lead: newLead });
});

router.post('/', (_req: Request, res: Response) => {
    res.json({ leads });
});

export default router;
