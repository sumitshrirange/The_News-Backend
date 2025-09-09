import express from "express";
import axios from "axios";
import dotenv from "dotenv"
dotenv.config()

const router = express.Router();

const API_KEY = process.env.SERP_API_KEY;

// GET /api/news/:topicToken
router.get("/:topicToken", async (req, res) => {
  try {
    const { topicToken } = req.params;

    const response = await axios.get("https://serpapi.com/search.json", {
      params: {
        engine: "google_news",
        gl: "in",
        topic_token: topicToken,
        api_key: API_KEY,
      },
    });

    res.json(response.data.news_results || []);
  } catch (error) {
    console.error("Error fetching SerpApi news:", error.message);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

export default router;
