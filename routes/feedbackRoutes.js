const express = require('express');
const router = express.Router();
const UserFeedback = require('../models/UserFeedback');

// Create new feedback
router.post('/feedback', async (req, res) => {
    try {
        const feedback = new UserFeedback(req.body);
        await feedback.save();
        res.status(201).send(feedback);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all feedbacks
router.get('/feedback', async (req, res) => {
    try {
        const feedbacks = await UserFeedback.find();
        res.status(200).send(feedbacks);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
