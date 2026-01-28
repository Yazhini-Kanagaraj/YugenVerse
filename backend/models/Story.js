const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  title: String,
  content: String,
  mood: String,

  author: String,
  anonymous: Boolean,

  approved: { type: Boolean, default: false },
  featured: { type: Boolean, default: false },

  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

module.exports = mongoose.model("Story", storySchema);
