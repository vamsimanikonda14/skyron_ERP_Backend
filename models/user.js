const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullname: { type: String, required: true }  // Add the fullname field
});

module.exports = mongoose.model('User', userSchema);
