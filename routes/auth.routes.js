const express = require("express");
const {
  register,
  login,
  logout,
  verification,
  forgotPassword,
  verifyOTP,
  changePassword,
} = require("../controllers/auth.controller");
const isAuthenticated = require("../middleware/auth.middleware");
const {
  validateUser,
  registerSchema,
  loginSchema,
  emailSchema,
} = require("../validators/auth.validator");
const router = express.Router();

router.post("/register", validateUser(registerSchema), register);
router.post("/verify/", verification);
router.post("/login", validateUser(loginSchema), login);
router.post("/logout", isAuthenticated, logout);
router.post("/forgot-password", validateUser(emailSchema), forgotPassword);
router.post("/verify-otp/:email", verifyOTP);
router.post("/change-pass/:email", changePassword);

module.exports = router;
