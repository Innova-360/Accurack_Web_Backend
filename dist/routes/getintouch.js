"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDb = getDb;
// /src/routes/leads.ts
const express_1 = __importDefault(require("express"));
const firestore_1 = require("firebase-admin/firestore");
const router = express_1.default.Router();
let db;
// Instead of initializing Firestore here, export a function to get the db instance
function getDb() {
    if (!db) {
        db = (0, firestore_1.getFirestore)();
    }
    return db;
}
router.post('/', async (req, res) => {
    const db = getDb();
    const data = req.body;
    try {
        const docRef = await db.collection('getintouch').add(data);
        const newGetInTouch = (await docRef.get()).data();
        console.log('🟢 New GetInTouch:', newGetInTouch);
        res.status(201).json({ message: 'Get in touch form submitted successfully', getInTouch: newGetInTouch });
    }
    catch (err) {
        console.error('❌ Failed to save get in touch to Firestore:', err);
        res.status(500).json({ error: 'Failed to save get in touch' });
    }
});
// Get all leads from Firestore
router.get('/', async (_req, res) => {
    const db = getDb();
    try {
        const snapshot = await db.collection('getintouch').orderBy('createdAt', 'desc').get();
        const leads = snapshot.docs.map(doc => doc.data());
        res.json({ leads });
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch leads' });
    }
});
exports.default = router;
