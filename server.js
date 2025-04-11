require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Parse incoming JSON requests

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes); 

const messageRoutes = require('./routes/message');
app.use('/api/messages', messageRoutes);

const postRoutes = require('./routes/post');
app.use('/api/posts', postRoutes);

const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

app.use('/api/auth', authRoutes); 

app.use('/uploads', express.static('uploads'));
