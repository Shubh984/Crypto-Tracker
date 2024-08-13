const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { FavoriteBook } = require('./models/FavoriteBook'); 


// Middleware to authenticate and decode JWT
const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
  } catch (error) {
      res.status(400).send('Invalid token.');
  }
};


// Register User
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login User
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const payload = { _id: user._id, username: user.username };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Protected routes for Favorites
router.get('/favorites', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/favorites/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user.favorites.includes(req.params.id)) {
      user.favorites.push(req.params.id);
      await user.save();
    }
    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/favorites/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.favorites = user.favorites.filter(item => item !== req.params.id);
    await user.save();
    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Protected routes for History
router.get('/history', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    res.json({ message: 'This is a protected route. User history will be here.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/history/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user.history.includes(req.params.id)) {
      user.history.push(req.params.id);
      await user.save();
    }
    res.json(user.history);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/history/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.history = user.history.filter(item => item !== req.params.id);
    await user.save();
    res.json(user.history);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
