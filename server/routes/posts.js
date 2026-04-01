import express from "express";
import Post from "../models/Post.js";
import { requireAuth } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

// GET /api/posts — public
router.get("/", async (req, res) => {
  const posts = await Post.find().populate("author", "username").sort("-createdAt");
  res.json(posts);
});

// POST /api/posts — protected, with optional image
router.post("/", requireAuth, upload.single("image"), async (req, res) => {
  try {
    const { title, body } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    const post = await Post.create({ title, body, imageUrl, author: req.session.userId });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/posts/:id — protected
router.put("/:id", requireAuth, async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id, author: req.session.userId },
      req.body,
      { new: true }
    );
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/posts/:id — protected
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({ _id: req.params.id, author: req.session.userId });
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;