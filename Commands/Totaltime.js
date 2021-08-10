var Discord = require('discord.js')
var mongoose = require(`mongoose`)
var config = require(`../config.json`)
const mongo = require('../Alwaysrunning/mongo')
const timeLogModel = require('../models/timeLog')

module.exports = {

    name: 'totaltime',
    description: 'Totaltime ......',

    async execute(message, args) {
        const user = message.mentions.users.first() || message.member.user;
        await mongo().then(async (mongoose) => {
            try {
                const previousTimeLog = await timeLogModel.findOne({ guildid: message.channel.guild.id, discordid: user.id }, (err, guild) => {
                    if (err) return console.log(err)
                    if (!guild) {
                        message.reply('Total minutes: `0.00`')
                    }
                })
                const prevTotalTime = previousTimeLog.totaltime
                message.reply(`Total minutes: \`${prevTotalTime}\``)
            } catch (err) {
                console.log(err)
            } finally {
                mongoose.connection.close()
            }
        })
    }
}