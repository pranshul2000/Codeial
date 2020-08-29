const mongoose = require('mongoose');

const resetPasswordSchema = new mongoose.Schema({
    user: {
        type: String
    },

    accessToken: {
        type: String,
        required: true,
        unique: true
    },

    isValid: {
        type: Boolean,
        required: true
    }
});

const ResetPassword = mongoose.model('ResetPassword', resetPasswordSchema);
module.exports = ResetPassword;