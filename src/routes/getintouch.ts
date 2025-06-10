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

    try {
        const docRef = await db.collection('getintouch').add(data);
        const newGetInTouch = (await docRef.get()).data();
        console.log('🟢 New GetInTouch:', newGetInTouch);
        res.status(201).json({ message: 'Get in touch form submitted successfully', getInTouch: newGetInTouch });
    } catch (err) {
        console.error('❌ Failed to save get in touch to Firestore:', err);
        res.status(500).json({ error: 'Failed to save get in touch' });
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
