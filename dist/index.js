"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const chat_1 = __importDefault(require("./routes/chat"));
const leads_1 = __importDefault(require("./routes/leads"));
const app_1 = require("firebase-admin/app");
const firestore_1 = require("firebase-admin/firestore");
dotenv_1.default.config();
const app = (0, express_1.default)();
// Build service account from environment variables
const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};
// Initialize Firebase Admin SDK
(0, app_1.initializeApp)({
    credential: (0, app_1.cert)(serviceAccount)
});
const db = (0, firestore_1.getFirestore)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/chatbot', chat_1.default);
app.use('/api/leads', leads_1.default);
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
