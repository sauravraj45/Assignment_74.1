const express = require("express");
const router = express.Router();
const auth = require("./authMiddleware");

const {
  signup,
  login,
  forgotPassword,
  getMe
} = require("./authController");

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.get("/me", auth, getMe);

module.exports = router;

