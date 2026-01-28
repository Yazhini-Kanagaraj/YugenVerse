const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ---------------- REGISTER ----------------
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "Email already registered" });

  const hashed = await bcrypt.hash(password, 12);

  const user = await User.create({
    name,
    email,
    password: hashed
  });

  const token = jwt.sign(
  {
    id: user._id,
    role: user.role,
    email: user.email,
    name: user.name, // add name here
  },
  process.env.JWT_SECRET,
  { expiresIn: "7d" } // 7 days for normal login/register tokens
);

  res.json({ token, user });
};

// ---------------- LOGIN ----------------
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !user.password)
    return res.status(400).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Invalid credentials" });

const token = jwt.sign(
  {
    id: user._id,
    role: user.role,
    email: user.email,
    name: user.name, // add name here
  },
  process.env.JWT_SECRET,
  { expiresIn: "7d" } // 7 days for normal login/register tokens
);
  res.json({ token, user });
};

// ---------------- GOOGLE LOGIN ----------------
exports.googleLogin = async (req, res) => {
  const { tokenId } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, sub: googleId, picture } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        googleId,
        avatar: picture
      });
    }
const token = jwt.sign(
  {
    id: user._id,
    role: user.role,
    email: user.email,
    name: user.name, // add name here
  },
  process.env.JWT_SECRET,
  { expiresIn: "1h" } // 7 days for normal login/register tokens
);

    res.json({ token, user });

  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Google authentication failed" });
  }
};
