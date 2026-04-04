const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
  try {
    const { email, password, fullName } = req.body;

    const newUser = new User({ 
      email: email, 
      password: password,
      fullName: fullName
    });

    const savedUser = await newUser.save();
    
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const {email, password} = req.body;

    const user = await User.findOne({email: email});

    if(!user)
    {
      return res.status(400).json({error: "Invalid password"});
    }

    if(user.password !== password)
    {
      return res.status(400).json({error: "Invalid Password"});
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

module.exports = router;