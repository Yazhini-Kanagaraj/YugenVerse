const mongoose = require("mongoose");

const poemSchema = new mongoose.Schema({
  title: String,
  content: String,
  category: String,

  author: String,
  anonymous: Boolean,

  approved: { type: Boolean, default: false },
  featured: { type: Boolean, default: false },

  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

module.exports = mongoose.model("Poem", poemSchema);
