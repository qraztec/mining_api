const mongoose = require('mongoose');

const userFeedbackSchema = new mongoose.Schema({
    commentText: { type: String, required: true },
    area: { type: String, required: true },
    companyID: {type: String, required: true}
});

module.exports = mongoose.model('UserFeedback', userFeedbackSchema);
