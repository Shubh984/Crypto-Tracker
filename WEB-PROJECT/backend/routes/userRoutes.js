const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const passport = require('passport');

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
    console.error('Registration Error:', error); // Log the actual error
    res.status(500).json({ message: 'Server error during registration' }); // More descriptive error message
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
    console.error('Login Error:', error); // Log the actual error
    res.status(500).json({ message: 'Server error during login' }); // More descriptive error message
  }
});

// Add product to favorites
router.post('/favorites', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { productId } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (!user.favorites.includes(productId)) {
      user.favorites.push(productId);
      await user.save();
      return res.status(200).json({ message: 'Product added to favorites' });
    }
    return res.status(400).json({ message: 'Product already in favorites' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove product from favorites
router.delete('/favorites', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { productId } = req.body;
  try {
    const user = await User.findById(req.user._id);
    user.favorites = user.favorites.filter(fav => fav.toString() !== productId);
    await user.save();
    res.status(200).json({ message: 'Product removed from favorites' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's favorite products
router.get('/favorites', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('favorites');
    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
