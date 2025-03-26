const express = require('express');
const { signup, login, getUserProfile, updateUser, deleteUser,getAllUsers } = require('../controller/userController');

const router = express.Router();

// POST - Sign up (creates a new user)
router.post('/signup', signup);

// POST - Login (authenticates user and generates a token)
router.post('/login', login); // Use loginUser from authController

// GET - Get user profile by ID
router.get('/users/:id', getUserProfile);

// PUT - Update user data by ID
router.put('/users/:id', updateUser);

// DELETE - Delete user by ID
router.delete('/users/:id', deleteUser);

router.get('/users/', getAllUsers);

module.exports = router;
