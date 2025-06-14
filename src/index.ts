// src/index.ts
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import chatRouter from './routes/chat';
import leadsRouter from './routes/leads';
import getInTouchRouter from './routes/getintouch';
import { initializeApp as initializeAdminApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { ServiceAccount } from 'firebase-admin';

dotenv.config();

const app = express();

// Build service account from environment variables
const serviceAccount: ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

// Initialize Firebase Admin SDK
initializeAdminApp({
  credential: cert(serviceAccount)
});
const db = getFirestore();

app.use(cors());
app.use(express.json());
app.use('/api/chatbot', chatRouter);
app.use('/api/leads', leadsRouter);
app.use('/api/getintouch', getInTouchRouter);

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