const express = require("express");
const { protect, adminOnly } = require("../middleware/auth");
const Poem = require("../models/Poem");
const Story = require("../models/Story");
const Contact = require("../models/Contact");

const router = express.Router();

router.get("/dashboard", protect, adminOnly, async (_, res) => {
  const poems = await Poem.find({ approved: false });
  const stories = await Story.find({ approved: false });
  const messages = await Contact.find();
  res.json({ poems, stories, messages });
});


module.exports = router;
