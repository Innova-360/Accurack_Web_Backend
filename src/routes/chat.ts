import express from 'express';
import dotenv from 'dotenv';
import { chatController } from '../controllers/chat.controller';

dotenv.config();

const router = express.Router();

router.post('/', chatController);

export default router;
