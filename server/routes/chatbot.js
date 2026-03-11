import { Router } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = Router();

// Ensure the key is present before initializing
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.error("❌ ERROR: GEMINI_API_KEY is missing from .env file!");
}

const genAI = new GoogleGenerativeAI(apiKey);

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }

    // Use "gemini-1.5-flash" - this is the current standard.
    // If this fails with 404, the issue is your Google Cloud Project 
    // not having the "Generative Language API" enabled.
  const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
  
    const context = `
You are a helpful travel assistant for Chitranchal Himalayan Retreat in Mukteshwar, Uttarakhand.

Information:
- Chitranchal Himalayan Retreat is located in Mukteshwar, providing a peaceful stay.
- Famous places nearby: Mukteshwar Temple (350 years old), Chauli Ki Jali (cliff views), Bhalu Gaad Waterfall.
- Activities: Trekking, stargazing, bird watching, and viewing the Nanda Devi peak.
- Best season: March to June (Pleasant) and October to February (Snow/Chilly).
- Local food: Kumaoni specials like Bhatt ki Churkani and Gahat ki Dal.

Instruction: Answer in a friendly, welcoming tone. Keep it concise but helpful.
User question: ${message}
`;

    // Added a safety timeout or simple config if needed
    const result = await model.generateContent(context);
    const response = await result.response;
    const reply = response.text();

    res.json({ reply });

  } catch (error) {
    // Better error logging to see exactly what failed
    console.error("AI Route Error:", error.message);
    
    if (error.message.includes("404")) {
        res.status(404).json({ error: "Model not found. Please check API enabling in Google Cloud Console." });
    } else {
        res.status(500).json({ error: "AI failed to respond. Please try again." });
    }
  }
});

export default router;