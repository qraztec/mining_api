const mongoose = require('mongoose');

const sustainabilityMetricsSchema = new mongoose.Schema({
    pollution_control: { type: Number, min: -10, max: 10 },
    food_sovereignty: { type: Number, min: -10, max: 10 },
    water_recycling: { type: Number, min: -10, max: 10 }
});

const operationSchema = new mongoose.Schema({
    companyID: { type: String, required: true },
    area: { type: String, required: true },
    operability_score: { type: Number, min: -10, max: 10, required: true },
    sentiment_score: { type: Number, min: -10, max: 10, required: true },
    sustainability_score: { type: Number, min: -10, max: 10, required: true },
    sustainability_metrics: { type: sustainabilityMetricsSchema, required: true }
});

module.exports = mongoose.model('Operation', operationSchema);
