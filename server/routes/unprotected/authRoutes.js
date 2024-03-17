const express = require('express');
const router = express.Router();

const authController = require('../../controllers/authController');

// Register a new user
router.post('/register', authController.registerUser);

// Log in a user
router.post('/login', authController.loginUser);

// Log out a user
router.post('/logout', authController.logoutUser);

module.exports = router;
