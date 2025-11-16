const express = require("express");
const router = express.Router();
const passport = require("passport");
const authController = require("../controllers/oauth.controller");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  authController.googleCallback
);

router.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  authController.getUser
);

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;
