const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv")
const connectDB = require("./config/db.js");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const newsRoutes = require("./routes/news.routes.js");
const summarizeRoutes = require("./routes/summarize.routes.js");

dotenv.config();
connectDB();

const app = express();
// const PORT = process.env.PORT;

// Middleware
app.use(cors({
  origin: ["http://localhost:5173", `${process.env.FRONTEND_URL}`],
  credentials: true,
})); // Allow frontend requests from any origin (or restrict to the frontend URL)
app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/news", newsRoutes);
app.use("/api/summarize", summarizeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// Start server
// app.listen(PORT, () => {
//   console.log(`Backend running on port ${PORT}`);
// });

// Do not use app.listen() in vercel. <------------------------

module.exports = app;
