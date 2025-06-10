"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const chat_controller_1 = require("../controllers/chat.controller");
dotenv_1.default.config();
const router = express_1.default.Router();
router.post('/', chat_controller_1.chatController);
exports.default = router;
