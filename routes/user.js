// routes/user.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

// GET /api/users/search?q=queryString
router.get('/search', authMiddleware, async (req, res) => {
  try {
    // Get query parameter "q"
    const searchQuery = req.query.q || "";
    // Create a case-insensitive regex for matching search text
    const regex = new RegExp(searchQuery, "i");
    // Find users matching the name or email
    const users = await User.find({
      $or: [
        { name: { $regex: regex } },
        { email: { $regex: regex } }
      ]
    }).select('name email phone'); // return only selected fields
    res.json(users);
  } catch (err) {
    console.error("User search error:", err);
    res.status(500).json({ error: 'Error searching for users.' });
  }
});

module.exports = router;
