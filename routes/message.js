// routes/message.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Message = require('../models/Message');

// GET /api/messages — Fetch messages
router.get('/', authMiddleware, async (req, res) => {
  try {
    const messages = await Message.find()
      .populate('sender', 'name email phone')
      .sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Server error while fetching messages.' });
  }
});

// POST /api/messages — Send a message
router.post('/', authMiddleware, async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Message text is required.' });
  }

  try {
    const newMessage = new Message({
      sender: req.user.userId,
      text
    });
    await newMessage.save();
    res.status(201).json({ message: 'Message sent successfully!', data: newMessage });
  } catch (err) {
    res.status(500).json({ error: 'Server error while sending message.' });
  }
});

module.exports = router;
