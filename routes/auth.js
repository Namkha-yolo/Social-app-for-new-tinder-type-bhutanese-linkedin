const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!name || (!email && !phone) || !password) {
    return res.status(400).json({ error: 'Name, password, and email or phone are required.' });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Server error during signup.' });
  }
});

router.post('/login', async (req, res) => {
    const { email, phone, password } = req.body;
  
    if ((!email && !phone) || !password) {
      return res.status(400).json({ error: 'Email or phone and password are required.' });
    }
  
    try {
      const user = await User.findOne({
        $or: [{ email }, { phone }]
      });
  
      if (!user) {
        return res.status(400).json({ error: 'User not found.' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid password.' });
      }
  
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
  
      res.json({
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone
        }
      });
    } catch (err) {
      res.status(500).json({ error: 'Server error during login.' });
    }
  });
  const authMiddleware = require('../middleware/auth');

// Protected route to test JWT
router.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'You accessed a protected route!', userId: req.user.userId });
});

  
  // ✅ Export the router
  module.exports = router;
