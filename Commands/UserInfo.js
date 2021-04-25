var Discord = require('discord.js')

module.exports = {

    name: 'UserInfo',
    description: 'UserInfo ......',

    execute(message, msg, args) {
        const member = message.mentions.members.first() || message.member;
        const user = message.mentions.users.first() || message.member.user;
        const userSpecified = parseInt(args[1])
        
        const embed = new Discord.MessageEmbed()
            .setTitle('User Information')
            .setDescription('Displays User Information')
            .addField('Username', user.username)
            .addField('Account created at', user.createdAt.toLocaleDateString())
            .addField('User joined at', member.joinedAt.toLocaleDateString())
            .setThumbnail(user.displayAvatarURL())
            .setFooter('Made by Ddogwildone1')
            .setTimestamp()

        message.channel.send(embed)

    }

}

