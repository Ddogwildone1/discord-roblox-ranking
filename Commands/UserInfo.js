var Discord = require('discord.js')
const { prefix } = require('../config.json');

module.exports = {

    name: 'userinfo',
    description: 'Grabs info from your user, or if someone else is specified, them.',
    usage: `${prefix}userinfo [@(user)]`,

    execute(message, args) {
        const member = message.mentions.members.first() || message.member;
        const user = message.mentions.users.first() || message.member.user;
        const userSpecified = parseInt(args[0])
        
        const embed = new Discord.MessageEmbed()
            .setTitle('User Information')
            .setDescription('Displays User Information')
            .addField('Username', user.username)
            .addField('Account created at', user.createdAt.toLocaleDateString())
            .addField('User joined at', member.joinedAt.toLocaleDateString())
            .addField('UserID', user.id)
            .setThumbnail(user.displayAvatarURL())
            .setFooter('Made by Ddogwildone1')
            .setTimestamp()

        message.channel.send(embed)

    }

}

