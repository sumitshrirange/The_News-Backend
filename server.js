const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
// const dotenv = require("dotenv")
const connectDB = require("./config/db.js");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const newsRoutes = require("./routes/news.routes.js");
const summarizeRoutes = require("./routes/summarize.routes.js");
const passport = require("passport");
const oauthRoutes = require('./routes/oauth.route.js')

// dotenv.config();
connectDB();

require('./config/passport.js')

const app = express();
// const PORT = process.env.PORT;

// Middleware
app.use(cors()); // Allow frontend requests from any origin (or restrict to the frontend URL)
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize())

app.get("/", (req, res) => {
  res.send("The News Backend is Running...");
});

// Routes
app.use("/api/news", newsRoutes);
app.use("/api/summarize", summarizeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/auth", oauthRoutes);

// Start server
// app.listen(PORT, () => {
//   console.log(`Backend running on port ${PORT}`);
// });

// Do not use app.listen() in vercel. <------------------------

module.exports = app;
