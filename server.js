import express from "express";
import cors from "cors";
import newsRoutes from "./routes/news.js";
import summaryRoutes from "./routes/summary.js";
// import dotenv from "dotenv";

// dotenv.config();
const app = express();
// const PORT = process.env.PORT;

// Middleware
app.use(cors()); // Allow frontend requests from any origin (or restrict to the frontend URL)
app.use(express.json());

// Routes
app.use("/api/news", newsRoutes);
app.use("/api/summarize", summaryRoutes);

// Start server
// app.listen(PORT, () => {
//   console.log(`Backend running on port ${PORT}`);
// });

// Do not use app.listen() in vercel. <------------------------
export default app;