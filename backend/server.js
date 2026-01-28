require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const poemRoutes = require("./routes/poemRoutes");
const storyRoutes = require("./routes/storyRoutes");
const contactRoutes = require("./routes/contactRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
[app.use(cors({
  origin: ["http://localhost:5173", 
    "https://yugenverse-1.onrender.com" 
  ],// frontend URL
  credentials: true,
}))]
app.use(express.json()); // parse JSON bodies

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/poems", poemRoutes);
app.use("/api/stories", storyRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);

// Health Check Endpoint
app.get("/", (req, res) => {
  res.send("YugenVerse API is running 🌌");
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("💥 Server Error:", err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV || "development"} mode`);
});
