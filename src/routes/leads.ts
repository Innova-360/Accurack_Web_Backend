// /src/routes/leads.ts
import express from 'express';
import { getFirestore } from 'firebase-admin/firestore';


const router = express.Router();
type Request = express.Request;
type Response = express.Response;


let db: ReturnType<typeof getFirestore>;

// Instead of initializing Firestore here, export a function to get the db instance
export function getDb() {
  if (!db) {
    db = getFirestore();
  }
  return db;
}

router.post('/', async (req: Request, res: Response) => {
    const db = getDb();
    const data = req.body;

    // if (!name || !phone || !countryCode || !businessName || !industry || !address || !email || !help || !companyWeb) {
    //     return res.status(400).json({ error: 'All fields are required' });
        
    // }

    try {
        const docRef = await db.collection('leads').add(
            data
            // name,
            // phone,
            // countryCode,
            // businessName,
            // industry,
            // address,
            // email,
            // help,
            // companyWeb,
            // calendly: calendly || null,
            // createdAt: new Date().toISOString(),
        );
        const newLead = (await docRef.get()).data();
        console.log('🟢 New Lead:', newLead);
        res.status(201).json({ message: 'Lead captured successfully', lead: newLead });
    } catch (err) {
        console.error('❌ Failed to save lead to Firestore:', err);
        res.status(500).json({ error: 'Failed to save lead' });
    }
});

// Get all leads from Firestore
router.get('/', async (_req: Request, res: Response) => {
    const db = getDb();
    try {
        const snapshot = await db.collection('leads').orderBy('createdAt', 'desc').get();
        const leads = snapshot.docs.map(doc => doc.data());
        res.json({ leads });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch leads' });
    }
});

export default router;
