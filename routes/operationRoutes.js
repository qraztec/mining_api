const express = require('express');
const router = express.Router();
const Operation = require('../models/Operation');

// Create a new operation
router.post('/operations', async (req, res) => {
    try {
        const operation = new Operation(req.body);
        await operation.save();
        res.status(201).send(operation);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all operations
router.get('/operations', async (req, res) => {
    try {
        const operations = await Operation.find();
        res.status(200).send(operations);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
