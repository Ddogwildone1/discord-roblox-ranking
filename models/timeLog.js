const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const timeLogSchema = new Schema({
    discordid: {
        type: String,
        required: true,
        unique: true
    },
    discordname: {
        type: String,
        required: true
    },
    totaltime: {
        type: Number,
        required: true
    },
    guildid: {
        type: String,
        required: true
    }
}, { timestamps: true });

const timeLog = mongoose.model('timeLog', timeLogSchema);
module.exports = timeLog;