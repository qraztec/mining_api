const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }, // Stored as plain text (you can improve later)
    role: { type: String, required: true },  // "User", "Company", "Regulator"
    company: { type: String }  // Optional for non-company profiles
});

module.exports = mongoose.model('Profile', profileSchema);
