// src/index.ts
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import chatRouter from './routes/chat';
import leadsRouter from './routes/leads';
import { initializeApp as initializeAdminApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { ServiceAccount } from 'firebase-admin';
import serviceAccount from '../serviceAccountKey.json';

dotenv.config();

const app = express();

// Initialize Firebase Admin SDK
initializeAdminApp({
  credential: cert(serviceAccount as ServiceAccount)
});
const db = getFirestore();

app.use(cors());
app.use(express.json());
app.use('/api/chatbot', chatRouter);
app.use('/api/leads', leadsRouter);

// Firebase Web SDK config (for frontend use only, not for backend)
/*
const firebaseConfig = {
  apiKey: "AIzaSyDnmm8PkbeNJ_Ppw1U5QBL4tsWqniLobS8",
  authDomain: "accurack360.firebaseapp.com",
  projectId: "accurack360",
  storageBucket: "accurack360.firebasestorage.app",
  messagingSenderId: "784659632157",
  appId: "1:784659632157:web:623e23b7b4af61f08136f4"
};

import { initializeApp } from "firebase/app";
const app = initializeApp(firebaseConfig);

Note: This config is for frontend (browser) Firebase SDK. For backend, use firebase-admin with service account as already implemented.
*/

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ AccuRack backend running at http://localhost:${PORT}`);
});