const Poem = require("../models/Poem");

// Allowed poem categories
const allowedCategories = [
  "Dream",
  "Random",
  "Gothic",
  "Love",
  "Healing",
  "Nature",
  "Philosophy",
  "Existential",
  "Spiritual"
];

// Get all approved poems
exports.getPoems = async (req, res) => {
  try {
    const poems = await Poem.find({ approved: true }).sort({ createdAt: -1 });
    res.json(poems);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch poems", error: err.message });
  }
};
exports.getMyPoems = async (req, res) => {
  try {
    const poems = await Poem.find({ ownerId: req.user.id }).sort({ createdAt: -1 });
    res.json(poems);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch your poems" });
  }
};

// Get poems by category
exports.getPoemsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    if (!allowedCategories.includes(category)) {
      return res.status(400).json({ message: "Invalid poetry category" });
    }

    const poems = await Poem.find({ approved: true, category })
      .sort({ createdAt: -1 });

    res.json(poems);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch poems", error: err.message });
  }
};

// Create poem with category and anonymous support
exports.createPoem = async (req, res) => {
  try {
    const { title, content, category, anonymous } = req.body;

    if (!title || !content || !category) {
      return res.status(400).json({ message: "Title, content, and category are required" });
    }

    if (!allowedCategories.includes(category)) {
      return res.status(400).json({ message: "Invalid poetry category" });
    }

    const poem = await Poem.create({
      title,
      content,
      category,
      anonymous: !!anonymous,
      author: anonymous ? "Anonymous" : req.user.name || req.user.email,
      ownerId: req.user.id,
    });

    res.json({ message: "Poem submitted for approval" });
  } catch (err) {
    res.status(500).json({ message: "Failed to submit poem", error: err.message });
  }
};

// Approve poem (admin only)
exports.approvePoem = async (req, res) => {
  try {
    await Poem.findByIdAndUpdate(req.params.id, { approved: true });
    res.json({ message: "Poem approved" });
  } catch (err) {
    res.status(500).json({ message: "Failed to approve poem", error: err.message });
  }
};

// Feature poem (admin only)
exports.featurePoem = async (req, res) => {
  try {
    const { featured } = req.body;
    await Poem.findByIdAndUpdate(req.params.id, { featured });
    res.json({ message: "Poem feature updated" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update feature" });
  }
};


// Delete poem (admin only)
exports.deletePoem = async (req, res) => {
  try {
    await Poem.findByIdAndDelete(req.params.id);
    res.json({ message: "Poem deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete poem", error: err.message });
  }
};
exports.deleteMyPoem = async (req, res) => {
  try{
  const poem = await Poem.findById(req.params.id);

  if (!poem) return res.status(404).json({ message: "Not found" });

  if (poem.ownerId.toString() !== req.user.id)
    return res.status(403).json({ message: "Not your post" });

  await poem.deleteOne();
  res.json({ message: "Deleted" });
} catch (err) {
    res.status(500).json({ message: "Failed to delete poem" });
  }
};


// Get featured poems (public)
exports.getFeaturedPoems = async (req, res) => {
  try {
    const poems = await Poem.find({ approved: true, featured: true })
      .sort({ createdAt: -1 })
      .limit(6);

    res.json(poems);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch featured poems", error: err.message });
  }
};

// Get pending poems (admin only)
exports.getPendingPoems = async (req, res) => {
  try {
    const poems = await Poem.find({ approved: false }).sort({ createdAt: -1 });
    res.json(poems);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch pending poems", error: err.message });
  }
};
exports.updateMyPoem = async (req, res) => {
  try {
    const poem = await Poem.findById(req.params.id);

    if (!poem) return res.status(404).json({ message: "Not found" });
    if (poem.ownerId.toString() !== req.user.id)
      return res.status(403).json({ message: "Not your post" });

    poem.title = req.body.title;
    poem.content = req.body.content;
    poem.category = req.body.category;
    poem.anonymous = req.body.anonymous;

    // After edit, send again for approval
    poem.approved = false;

    await poem.save();
    res.json({ message: "Poem updated and sent for re-approval" });
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};
