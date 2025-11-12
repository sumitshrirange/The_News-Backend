const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const API_KEY = process.env.SERP_API_KEY;

const getNews = async (req, res) => {
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
};

module.exports = getNews;
