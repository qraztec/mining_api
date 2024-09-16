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

// Get a specific operation by companyID and area
router.get('/operations/:companyID/:area', async (req, res) => {
    const { companyID, area } = req.params;
    try {
        const operation = await Operation.findOne({ companyID, area });
        if (!operation) {
            return res.status(404).json({ message: 'Operation not found' });
        }
        res.status(200).json(operation);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching operation data' });
    }
});

// In operationRoutes.js
router.get('/operations/:areaName', async (req, res) => {
    const { areaName } = req.params;
    try {
        const operations = await Operation.find({ area: areaName }); // Fetch operations for the area
        res.status(200).json(operations);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching operations' });
    }
});



// Get all operations
router.get('/operations/:companyID', async (req, res) => {
    const { companyID } = req.params;
    try {
        const operations = await Operation.find({ companyID }); // Find operations by companyID
        res.status(200).send(operations);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
