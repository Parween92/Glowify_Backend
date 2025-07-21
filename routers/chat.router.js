import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const chatRouter = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

chatRouter.post("/", async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    console.log("Received message:", message);
    console.log("API Key exists:", !!process.env.OPENAI_API_KEY);
    console.log(
      "API Key starts with:",
      process.env.OPENAI_API_KEY?.substring(0, 20)
    );

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const systemPrompt = {
      role: "system",
      content: `Du bist ein freundlicher Kundenservice-Assistent für Glowify Shop, einen Online-Shop für Beauty- und Kosmetikprodukte. 
      
      Deine Aufgaben:
      - Beantworte Fragen zu Produkten, Versand, Rücksendungen
      - Hilf bei Bestellproblemen
      - Gib Produktempfehlungen
      - Sei immer höflich und hilfsbereit
      - Antworte auf Deutsch
      - Bei technischen Problemen verweise an den Support
      
      Produktkategorien: Hautpflege, Make-up, Parfüm, Haarpflege
      Versandzeit: 2-4 Werktage
      Kostenloser Versand ab 50€
      Rückgabe: 30 Tage Rückgaberecht`,
    };

    const messages = [
      systemPrompt,
      ...conversationHistory.slice(-10),
      { role: "user", content: message },
    ];

    console.log("Sending to OpenAI:", messages);
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: messages,
      max_tokens: 300,
      temperature: 0.7,
    });

    const botResponse = completion.choices[0].message.content;
    console.log("OpenAI Response:", botResponse);

    res.json({
      response: botResponse,
      success: true,
    });
  } catch (error) {
    console.error("FULL OpenAI API Error:", error);
    console.error("Error message:", error.message);
    console.error("Error status:", error.status);
    console.error("Error code:", error.code);

    const fallbackResponses = [
      "Entschuldigung, ich habe momentan technische Probleme. Bitte versuche es später noch einmal.",
      "Es tut mir leid, aber ich kann gerade nicht antworten. Kontaktiere gerne unseren Support direkt.",
      "Momentan bin ich nicht verfügbar. Schau gerne in unseren FAQ-Bereich oder kontaktiere unseren Kundenservice.",
    ];

    const randomFallback =
      fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];

    res.json({
      response: randomFallback,
      success: false,
      error: "AI service temporarily unavailable",
      details: error.message,
    });
  }
});

export default chatRouter;
