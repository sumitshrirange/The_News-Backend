const express = require("express");
const getNews = require("../controllers/news.controller");

const router = express.Router();

// GET /api/news/:topicToken
router.get("/:topicToken", getNews);

module.exports = router;
