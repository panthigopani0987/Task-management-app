const express = require('express');

const routes = express.Router();

const User = require('../models/User');

routes.get('/', async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//create posts
routes.post('/', async (req, res) => {
    const { name, email } = req.body;

    try {
        const newuser = new User({ name, email });
        await newuser.save();
        res.status(200).json(newuser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = routes ;