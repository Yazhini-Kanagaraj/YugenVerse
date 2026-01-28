const express = require("express");
const { protect, adminOnly } = require("../middleware/auth");
const {
  getPoems,
  getPoemsByCategory, // new endpoint for filtering by category
  getPendingPoems,
  createPoem,
  approvePoem,
  deletePoem,
  featurePoem,
  getFeaturedPoems,
  getMyPoems,
  deleteMyPoem,
  updateMyPoem
} = require("../controllers/poemController");

const router = express.Router();

// Public endpoints
router.get("/", getPoems); // all approved poems
router.get("/category/:category", getPoemsByCategory); // filter poems by category
router.get("/featured", getFeaturedPoems); // featured poems
// Admin endpoints
router.get("/pending", protect, adminOnly, getPendingPoems);
router.post("/", protect, createPoem);
router.put("/approve/:id", protect, adminOnly, approvePoem);
router.put("/feature/:id", protect, adminOnly, featurePoem);
router.delete("/my/:id", protect, deleteMyPoem);
router.delete("/:id", protect, adminOnly, deletePoem);
router.get("/my", protect, getMyPoems);
router.put("/my/:id", protect, updateMyPoem);


module.exports = router;
