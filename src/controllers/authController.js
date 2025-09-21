const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Generate JWT
const generateToken = (user) => {
  return jwt.sign({ id: user._id, username: user.username, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// Register new user
exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Please provide all required fields" });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists with this email" });
  }

  const user = await User.create({ username, email, password, role });

  res.status(201).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    token: generateToken(user),
  });
};

//  Login user

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await user.matchPassword(password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  res.json({
    _id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    token: generateToken(user),
  });
};
