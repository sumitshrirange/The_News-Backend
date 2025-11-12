const express = require("express");
const cors = require("cors");
const newsRoutes = require("./routes/news.routes.js");
const summarizeRoutes = require("./routes/summarize.routes.js");

// dotenv.config();
const app = express();
// const PORT = process.env.PORT;

// Middleware
app.use(cors()); // Allow frontend requests from any origin (or restrict to the frontend URL)
app.use(express.json());

// Routes
app.use("/api/news", newsRoutes);
app.use("/api/summarize", summarizeRoutes);

// Start server
// app.listen(PORT, () => {
//   console.log(`Backend running on port ${PORT}`);
// });

// Do not use app.listen() in vercel. <------------------------

module.exports = app;
