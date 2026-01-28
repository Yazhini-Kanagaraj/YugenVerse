const Story = require("../models/Story");

// Allowed story moods
const allowedMoods = [
  "Happy",
  "Sad",
  "Inspiring",
  "Funny",
  "Short Story",
  "Life Experience",
  "Random"
];

// Get all approved stories
exports.getStories = async (req, res) => {
  try {
    const stories = await Story.find({ approved: true }).sort({ createdAt: -1 });
    res.json(stories);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch stories", error: err.message });
  }
};
exports.getPendingStories = async (req, res) => {
  const stories = await Story.find({ approved: false }).sort({ createdAt: -1 });
  res.json(stories);
};
exports.getMyStories = async (req, res) => {
  try {
    const stories = await Story.find({ ownerId: req.user.id }).sort({ createdAt: -1 });
    res.json(stories);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch your stories" });
  }
};


// Get stories by mood
exports.getStoriesByMood = async (req, res) => {
  try {
    const { mood } = req.params;

    if (!allowedMoods.includes(mood)) {
      return res.status(400).json({ message: "Invalid story mood" });
    }

    const stories = await Story.find({ approved: true, mood })
      .sort({ createdAt: -1 });

    res.json(stories);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch stories", error: err.message });
  }
};

// Create story with mood and anonymous support
exports.createStory = async (req, res) => {
  try {
    const { content, mood, anonymous } = req.body;

    if (!content || !mood) {
      return res.status(400).json({ message: "Content and mood are required" });
    }

    if (!allowedMoods.includes(mood)) {
      return res.status(400).json({ message: "Invalid story mood" });
    }

    const story = new Story({
      content,
      mood,
      anonymous: !!anonymous,
      author: anonymous ? "Anonymous" : req.user.name || req.user.email,
      ownerId: req.user.id,
    });

    await story.save();

    res.json({ message: "Story submitted for approval" });
  } catch (err) {
    res.status(500).json({ message: "Failed to submit story", error: err.message });
  }
};

// Approve story (admin only)
exports.approveStory = async (req, res) => {
  try {
    await Story.findByIdAndUpdate(req.params.id, { approved: true });
    res.json({ message: "Story approved" });
  } catch (err) {
    res.status(500).json({ message: "Failed to approve story", error: err.message });
  }
};

// Delete story (admin only)
exports.deleteStory = async (req, res) => {
  try {
    await Story.findByIdAndDelete(req.params.id);
    res.json({ message: "Story deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete story", error: err.message });
  }
};

exports.deleteMyStory = async (req, res) => {
  try{
  const story = await Story.findById(req.params.id);

  if (!story) return res.status(404).json({ message: "Not found" });

  if (story.ownerId.toString() !== req.user.id)
    return res.status(403).json({ message: "Not your post" });

  await story.deleteOne();
  res.json({ message: "Deleted" });
} catch(err){
  res.status(500).json({ message: "Failed to delete story"})
}
};
// Get featured stories (public)
exports.getFeaturedStories = async (req, res) => {
  try {
    const stories = await Story.find({ approved: true, featured: true })
      .sort({ createdAt: -1 })
      .limit(6);

    res.json(stories);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch featured stories",
      error: err.message
    });
  }
};

// Feature story (admin only)
exports.featureStory = async (req, res) => {
  try {
    const { featured } = req.body;
    await Story.findByIdAndUpdate(req.params.id, { featured });
    res.json({ message: "Story feature updated" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update feature" });
  }
};
exports.updateMyStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);

    if (!story) return res.status(404).json({ message: "Not found" });
    if (story.ownerId.toString() !== req.user.id)
      return res.status(403).json({ message: "Not your post" });

    story.title = req.body.title;
    story.content = req.body.content;
    story.mood = req.body.mood;
    story.anonymous = req.body.anonymous;
    story.approved = false;

    await story.save();
    res.json({ message: "Story updated and sent for re-approval" });
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};
