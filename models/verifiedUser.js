const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const verifiedUserSchema = new Schema({
    discordid: {
        type: String,
        required: true,
        unique: true
    },
    robloxname: {
        type: String,
        required: true
    },
    robloxid: {
        type: String,
        required: true
    }
}, { timestamps: true });

const verifiedUser = mongoose.model('verifiedUser', verifiedUserSchema, 'verifiedUsers');
module.exports = verifiedUser;