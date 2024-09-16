const mongoose = require('mongoose');

const userFeedbackSchema = new mongoose.Schema({
    commentText: { type: String, required: true },
    useremail: { type: String, required: true },  // Can be "anonymous"
    area: { type: String, required: true },
    date: { type: Date, default: Date.now }  // Default to current date
});

module.exports = mongoose.model('UserFeedback', userFeedbackSchema);
