var Discord = require('discord.js')
var mongoose = require(`mongoose`)
var config = require(`../config.json`)
const mongo = require('../Alwaysrunning/mongo')
const timeLogModel = require('../models/timeLog')

module.exports = {

    name: 'changetime',
    description: 'Changetime ......',

    async execute(message, args) {
        var logsChannel = message.channel.guild.channels.cache.find(r => r.name === "join-logs")
        const userToChange = message.mentions.users.first()
        const negativeOrPositive = args[1]
        const timeChangeTo = parseInt(args[2])

        await mongo().then(async (mongoose) => {

            const previousTimeLog = await timeLogModel.findOne({ guildid: message.channel.guild.id, discordid: message.author.id }, (err, guild) => {
                if (err) return console.log(err)
                if (!guild) {
                    const connectToMongoDB = async () => {
                        await mongo().then(async (mongoose) => {
                            try {
                                await timeLogModel.findOneAndUpdate(
                                    {
                                        guildid: message.channel.guild.id,
                                        discordid: userToChange.id
                                    }, {
                                    guildid: message.channel.guild.id,
                                    totaltime: 0.00,
                                    discordid: userToChange.id
                                }, {
                                    upsert: true
                                }
                                )
                                message.reply('Specified user did not previously checkin. Re-run the command.')
                                return;
                            } catch (err) {
                                console.log(err)
                            } finally {
                                mongoose.connection.close()
                            }
                        })
                    }
                    connectToMongoDB()
                }
            })
            console.log(negativeOrPositive)
            const previousTotalTime = previousTimeLog.totaltime
            console.log(previousTotalTime)
            let time1 = parseFloat(previousTotalTime, 10)
            console.log(time1)
            let time2 = parseFloat(timeChangeTo, 10)
            console.log(time2)
            let totalTime = eval(`time1 ${negativeOrPositive} time2`)
            let timeToLog = parseFloat(totalTime, 10)
            console.log(timeToLog)

            await mongo().then(async (mongoose) => {
                try {
                    await timeLogModel.findOneAndUpdate(
                        {
                            guildid: message.channel.guild.id,
                            discordid: userToChange.id
                        }, {
                        guildid: message.channel.guild.id,
                        totaltime: timeToLog,
                        discordid: userToChange.id
                    }, {
                        upsert: true
                    }
                    )
                } catch (err) {
                    console.log(err)
                } finally {
                    mongoose.connection.close()
                    message.reply(`Successful.\nPrevious Total Time: \`${previousTotalTime}\`\nNew Total Time: \`${timeToLog}\``)
                    const changeembed = new Discord.MessageEmbed()
                        .setTitle("User's Total Time Changed")
                        .setDescription(`${message.author} has changed a user's total time!`)
                        .addField(`>changetime was used in ${message.channel.name}.`, '-')
                        .setThumbnail(message.author.displayAvatarURL())
                        .setFooter('Made by Ddogwildone1')
                        .setTimestamp()

                    logsChannel.send(changeembed)
                }
            })
        })
    }
}