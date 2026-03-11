import dotenv from "dotenv";
dotenv.config(); // 1. Load variables first

import express from "express";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';

// 2. Import routes AFTER dotenv is initialized
import chatbotRoute from "./routes/chatbot.js";
import contactRoute from "./routes/contact.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Routes
app.use("/api/chat", chatbotRoute);
app.use("/api/contact", contactRoute);

app.get("/", (req, res) => {
  res.json({ message: "Chitranchal Server chal raha hai! 🏔️" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log("GEMINI_API_KEY Loaded:", process.env.GEMINI_API_KEY ? "YES" : "NO");
});