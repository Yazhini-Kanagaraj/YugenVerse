const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");

// Send a contact message
exports.sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email, and message are required" });
    }

    await Contact.create({ name, email, message });

    // Setup nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.ADMIN_EMAIL,
      subject: "New YugenVerse Contact",
      text: message,
    });

    res.json({ msg: "Message sent" });
  } catch (err) {
    res.status(500).json({ message: "Failed to send message", error: err.message });
  }
};

// Get all contact messages (admin only)
exports.getMessages = async (_, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch messages", error: err.message });
  }
};
