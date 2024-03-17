const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../models/user');

// Register a new user
exports.registerUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const user = new User({ username });
        await User.register(user, password);

        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Log in a user
exports.loginUser = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (!user) {
            console.error('User not found');
            return res.status(401).json({ error: 'Unauthorized' });
        }
        req.logIn(user, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            // Respond with success message or user data
            return res.status(200).json({ message: 'Login Successful', user });
        });
    })(req, res, next);
};

// Logout the currently authenticated user
exports.logoutUser = (req, res, next) => {
    // Use req.logout with a callback function
    req.logout((err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.status(200).json({ message: 'Logout Successful' });
    });
};
