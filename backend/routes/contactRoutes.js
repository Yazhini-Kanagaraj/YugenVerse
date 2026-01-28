const express = require("express");
const router = express.Router();

const { sendMessage, getMessages } = require("../controllers/contactController");
const { protect, adminOnly } = require("../middleware/auth");

// Public - anyone can send message
router.post("/", sendMessage);

// Admin - only you can view messages
router.get("/", protect, adminOnly, getMessages);

module.exports = router;
