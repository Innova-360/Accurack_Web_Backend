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
    // if (!name || !phone || !countryCode || !businessName || !industry || !address || !email || !help || !companyWeb) {
    //     return res.status(400).json({ error: 'All fields are required' });
    // }
    try {
        const docRef = await db.collection('leads').add(data
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
    }
    catch (err) {
        console.error('❌ Failed to save lead to Firestore:', err);
        res.status(500).json({ error: 'Failed to save lead' });
    }
});
// Get all leads from Firestore
router.get('/', async (_req, res) => {
    const db = getDb();
    try {
        const snapshot = await db.collection('leads').orderBy('createdAt', 'desc').get();
        const leads = snapshot.docs.map(doc => doc.data());
        res.json({ leads });
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch leads' });
    }
});
exports.default = router;
