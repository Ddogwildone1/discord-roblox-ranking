var Discord = require('discord.js');
const suggestiontickets = new Map();
const { prefix } = require('../config.json');

module.exports = {

    name: 'purge',
    description: 'Removes the specified amount of messages from a channel.',
    usage: `${prefix}purge (number)`,

    async execute(message, args) {
        var logsChannel = message.channel.guild.channels.cache.find(r => r.name === "bot-logs")
        const Numberofmsg = parseInt(args[0])

        if (Numberofmsg > 100) {
            message.delete()
            message.reply("Number of messages to purge must be less than 100.")
                .then((m) => m.delete({ timeout: 5000 }))
            return
        }
        if (!Numberofmsg) {
            message.delete()
            message.reply("Either you never specified the amount of messages to purge, or your number of messages to purge isn't a number.")
                .then((m) => m.delete({ timeout: 10000 }))
            return;
        }

        message.delete()
            .then((m) => m.delete({ timeout: 100 }))
        message.channel.bulkDelete(Numberofmsg)
            .then((messages) => message.reply(`Deleted ${messages.size}.`))
            .then((m) => m.delete({ timeout: 5000 }))
            .catch((err) => {
                message.reply('Messages to be deleted must be under 14 days old, otherwise another error occured.')
                    .then((m) => m.delete({ timeout: 7000 }))
                console.log(err)
            })

        const purgeembed = new Discord.MessageEmbed()
            .setTitle('Messages Purged')
            .setDescription(`${message.author} has purged messages!`)
            .addField(`>purge was used in ${message.channel.name}.`, `Amount purged: ${Numberofmsg}`)
            .setThumbnail(message.author.displayAvatarURL())
            .setFooter('Made by Ddogwildone1')
            .setTimestamp()

        logsChannel.send(purgeembed)
    }

}