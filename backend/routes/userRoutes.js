const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/UserModel'); // Adjust path as needed

// Use a proper secret in a real routerlication
const salt = bcrypt.genSaltSync(10);
const secret = process.env.JWT_SECRET; // Make sure this is set

router.post('/register', async (req,res) => {
  const {username,email,password} = req.body;
  try{
    const userDoc = await User.create({
      username,
      email,
      password:bcrypt.hashSync(password,salt),
    });
    res.json(userDoc);
  } catch(e) {
    console.log(e);
    res.status(400).json(e);
  }
});

router.post('/login', async (req,res) => {
    const {email,password} = req.body;
    const userDoc = await User.findOne({email});
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      // logged in
      jwt.sign({email,id:userDoc._id}, secret, {}, (err,token) => {
        if (err) throw err;
        res.cookie('token', token).json({
          id:userDoc._id,
          username:userDoc.username,
        });
      });
    } else {
      res.status(400).json('wrong credentials');
    }
  });

  router.get('/profile', (req, res) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    jwt.verify(token, secret, {}, (err, info) => {
      if (err) {
        console.error('Token verification error:', err);
        return res.status(403).json({ message: 'Invalid token' });
      }
      res.json(info);
    });
  });

router.post('/logout', (req,res) => {
  res.cookie('token', '').json('ok');
});

module.exports = router;
