const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const timeLogSchema = new Schema({
    discordid: {
        type: String,
        required: true,
        unique: true
    },
    totaltime: {
        type: Number,
    },
    guildid: {
        type: String,
        required: true
    }
}, { timestamps: true });

const timeLog = mongoose.model('timeLog', timeLogSchema, 'timeLogs');
module.exports = timeLog;