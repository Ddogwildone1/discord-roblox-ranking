var Discord = require('discord.js')
var mongoose = require(`mongoose`)
var config = require(`../config.json`)
const mongo = require('../Alwaysrunning/mongo')
const timeLogModel = require('../models/timeLog')
const checkedInModel = require('../models/checkedIn')

module.exports = {

    name: 'resettime',
    description: 'Resettime ......',

    async execute(message, args) {
        var logsChannel = message.channel.guild.channels.cache.find(r => r.name === "join-logs")
        const filter = (m) => m.author.id === message.author.id
        let msg1 = await message.reply("Are you sure you want to reset the times of all members in this guild? Respond with Yes/No.")
        let response1 = await (message.channel.awaitMessages(filter, { max: 1 }))
            .then(async (response1) => {
                if (response1.first().content.toLowerCase() === 'yes') {
                    const connectToMongoDB = async () => {
                        await mongo().then(async (mongoose) => {
                            try {
                                await timeLogModel.deleteMany({ guildid: message.guild.id })
                            } catch (err) {
                                console.log(err)
                            } finally {
                                mongoose.connection.close()
                            }
                        })
                    }
                    connectToMongoDB()
                    message.reply('Successful.')
                    const resetembed = new Discord.MessageEmbed()
                        .setTitle('Time Logs Reset')
                        .setDescription(`${message.author} has reset all time logs!`)
                        .addField(`>resettime was used in ${message.channel.name}.`, '-')
                        .setThumbnail(message.author.displayAvatarURL())
                        .setFooter('Made by Ddogwildone1')
                        .setTimestamp()

                    logsChannel.send(resetembed)
                    return;
                }
                message.reply('Cancelled.')
            }).catch((err) => console.log(err))
    }

}
