// -------------------------------------- Using Gemini API - [Fast] ------------------------------------------------ //

import express from "express";
import axios from "axios";
import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const client = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

router.post("/", async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "URL is required" });

    const { data: html } = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    const dom = new JSDOM(html, { url });
    dom.window.document
      .querySelectorAll("style, script")
      .forEach((el) => el.remove());
    const article = new Readability(dom.window.document).parse();

    if (!article?.textContent)
      return res.status(400).json({ error: "Could not parse article" });

    const prompt = `Summarize this news article in 3–5 short paragraphs:\n\n${article.textContent.slice(
      0,
      2000
    )}`;

    const completion = await client.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const summary =
      completion.choices[0]?.message?.content ?? "No summary generated.";

    res.json({ title: article.title, summary, url });
  } catch (err) {
    console.error("Error summarizing:", err);
    res.status(500).json({ error: "Failed to summarize article" });
  }
});

export default router;

// -------------------------------------- Using JS Package (@xenova/transformers) - [Slow] ---------------------------------------------- //

// import express from "express";
// import axios from "axios";
// import { Readability } from "@mozilla/readability";
// import { JSDOM } from "jsdom";
// import { pipeline } from "@xenova/transformers";

// const router = express.Router();

// // Initialize summarization pipeline
// let summarizer;
// pipeline("summarization", "Xenova/bart-large-cnn").then((model) => {
//   summarizer = model;
//   console.log("Summarization model loaded");
// });

// async function summarizeText(text) {
//   if (!summarizer) throw new Error("Summarization model not loaded yet");
//   const output = await summarizer(text, {
//     max_length: 300,
//     min_length: 50,
//     do_sample: false,
//   });
//   return output[0].summary_text;
// }

// router.post("/", async (req, res) => {
//   try {
//     const { url } = req.body;
//     if (!url) return res.status(400).json({ error: "URL is required" });

//     // 1. Fetch article HTML
//     const { data: html } = await axios.get(url, { timeout: 2000 }); // if api failed to load data, then timeout will run, means after that u need to refresh to get data.

//     // 2. Extract main content
//     const dom = new JSDOM(html, { url });
//     const reader = new Readability(dom.window.document);
//     const article = reader.parse();

//     if (!article || !article.textContent) {
//       return res.status(400).json({ error: "Could not parse article" });
//     }

//     const MAX_CHARS = 1000;
//     const textForSummary = article.textContent.slice(0, MAX_CHARS);

//     // 3. Summarize locally
//     const summary = await summarizeText(textForSummary);

//     // 5. Return JSON
//     res.json({ title: article.title, summary, url });
//   } catch (error) {
//     console.error("Error summarizing:", error.message);
//     res.status(500).json({ error: "Failed to summarize article" });
//   }
// });

// export default router;
