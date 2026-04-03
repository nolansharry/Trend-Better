const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    const newUser = new User({ 
      email: email, 
      password: password 
    });

    const savedUser = await newUser.save();
    
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;