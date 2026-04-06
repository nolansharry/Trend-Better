const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/register", async (req, res) => {
  console.log("Received registration request:", req.body);
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    console.log("1. Checking for existing user...");
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Email already exists" });
    }

    console.log("2. Creating new user...");
    const newUser = new User({
      email,
      password,
      firstName,
      lastName,
    });

    console.log("3. Saving user...");
    const savedUser = await newUser.save();

    console.log("4. Setting session...");
    req.session.userId = savedUser._id;      // ✅ set session

    console.log("5. Sending response...");
    res.status(201).json(savedUser);         // password stripped by toJSON transform
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const match = await user.matchPassword(password); // ✅ use bcrypt compare
    if (!match) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    req.session.userId = user._id;           // ✅ set session
    res.status(200).json(user);              // password stripped by toJSON transform
  } catch (err) {
    console.error("Full register error:", err);
    res.status(500).json({ error: err.message });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy(() => res.json({ message: "Logged out" }));
});

module.exports = router;