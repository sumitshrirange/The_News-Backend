const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/auth.middleware");
const getUserData = require("../controllers/user.controller");

router.get("/data", isAuthenticated, getUserData);

module.exports = router;
