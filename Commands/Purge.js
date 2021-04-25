var Discord = require('discord.js');
const { execute } = require('./UserInfo');
const suggestiontickets = new Map();

module.exports = {

    name: 'Purge',
    description: 'Purge .....',

    async execute(message, msg, args) {
        var logsChannel = message.channel.guild.channels.cache.get('773011073950941216')
        const Numberofmsg = parseInt(args[1])

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