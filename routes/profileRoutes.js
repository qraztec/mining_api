const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile'); // Your Profile Model

// Create a new profile (register)
router.post('/register', async (req, res) => {
    const { email, password, role, company } = req.body;
    
    try {
        // Check if the user with the given email already exists
        const existingProfile = await Profile.findOne({ email });
        if (existingProfile) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Create a new profile instance
        const profile = new Profile({
            email,
            password, // In production, ensure to hash the password before saving
            role,
            company: role === 'Company' ? company : null // Company field only if role is 'Company'
        });

        // Save the profile to the database
        await profile.save();
        
        // Send success response
        res.status(201).json({ message: 'Profile registered successfully', profile });
    } catch (error) {
        // Handle validation or other errors
        res.status(400).json({ error: error.message });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await Profile.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the password matches (in a real app, you'd hash the password and compare the hash)
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // If everything matches, send a success response
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Get all profiles
router.get('/profile', async (req, res) => {
    try {
        const profiles = await Profile.find();
        res.status(200).send(profiles);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
