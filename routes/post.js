// routes/post.js
const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const authMiddleware = require('../middleware/auth');
const Post = require('../models/Post');

// Configure multer storage:
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save files to 'uploads' folder
  },
  filename: function (req, file, cb) {
    // Create a unique file name using the timestamp and a random number,
    // and keep the original file extension.
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// Create the Multer middleware:
const upload = multer({ storage });

// POST /api/posts/upload — Endpoint for uploading an image post
router.post('/upload', authMiddleware, upload.single('image'), async (req, res) => {
  const { caption } = req.body;
  if (!req.file) {
    return res.status(400).json({ error: 'Image file is required.' });
  }
  
  try {
    // Construct the image URL. Note: in production, you may store images on cloud storage.
    const imageUrl = `http://localhost:3000/uploads/${req.file.filename}`;
    const newPost = new Post({
      user: req.user.userId,   // This comes from the authMiddleware (JWT)
      imageUrl,
      caption,
      likes: [],
    });
    await newPost.save();
    res.status(201).json({ message: 'Post created!', post: newPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating post.' });
  }
});

module.exports = router;
