const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const checkedInSchema = new Schema({
    discordid: {
        type: String,
        required: true,
        unique: true
    },
    checkedintimestamp: {
        type: Number,
        required: true
    },
    guildid: {
        type: String,
        required: true
    }
}, { timestamps: false });

const checkedIn = mongoose.model('checkedIn', checkedInSchema, 'checkedIns');
module.exports = checkedIn;