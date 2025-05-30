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
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/chatbot', chat_1.default);
app.use('/api/leads', leads_1.default); // 👈 Mount the leads router
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ AccuRack backend running at http://localhost:${PORT}`);
});
