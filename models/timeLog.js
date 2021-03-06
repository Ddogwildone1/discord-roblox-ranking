const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const timeLogSchema = new Schema({
    guildid: {
        type: String,
        required: true,
    },
    totaltime: {
        type: Number,
    },
    discordid: {
        type: String,
        required: true
    }
}, { timestamps: true });

const timeLog = mongoose.model('timeLog', timeLogSchema, 'timeLogs');
module.exports = timeLog;