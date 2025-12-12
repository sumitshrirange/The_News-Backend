const axios = require("axios");
const { Readability } = require("@mozilla/readability");
const { JSDOM } = require("jsdom");
const OpenAI = require("openai");
const dotenv = require("dotenv");

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

const summarization = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "URL is required" });

    const { data: html } = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    const cleanedHtml = html.replace(/<style[\s\S]*?<\/style>/gi, "");

    const dom = new JSDOM(cleanedHtml, { url });
    dom.window.document
      .querySelectorAll("style, script")
      .forEach((el) => el.remove());
    const article = new Readability(dom.window.document).parse();

    if (!article?.textContent)
      return res.status(400).json({ error: "Could not parse article" });

    const prompt = `Summarize this news article in 3-5 short paragraphs:\n\n${article.textContent.slice(
      0,
      2000
    )}`;

    const completion = await client.chat.completions.create({
      model: "gemini-2.5-flash-lite",
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
};

module.exports = summarization;
