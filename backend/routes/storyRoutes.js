const express = require("express");
const { protect, adminOnly } = require("../middleware/auth");
const {
  getStories,
  getStoriesByMood, // get stories by mood
  getPendingStories,
  createStory,
  approveStory,
  deleteStory,
  getMyStories,
  deleteMyStory,
  getFeaturedStories,
  featureStory,
  updateMyStory
} = require("../controllers/storyController");

const router = express.Router();

// Public endpoints
router.get("/", getStories); // all approved stories
router.get("/pending", protect, adminOnly, getPendingStories);
router.get("/mood/:mood", getStoriesByMood); // filter stories by mood
router.get("/my", protect,getMyStories);
// Admin endpoints
router.post("/", protect, createStory);
router.put("/approve/:id", protect, adminOnly, approveStory);
router.delete("/:id", protect, adminOnly, deleteStory);
router.delete("/my/:id", protect, deleteMyStory);
router.get("/featured", getFeaturedStories); // public
router.put("/feature/:id", protect, adminOnly, featureStory);
router.put("/my/:id", protect, updateMyStory);

module.exports = router;
