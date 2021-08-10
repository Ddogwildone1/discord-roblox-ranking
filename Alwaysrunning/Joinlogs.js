var Discord = require('discord.js')

module.exports = (bot) => {
    bot.on('guildMemberAdd', member => {
        var joinlogsChannel = member.guild.channels.cache.find(r => r.name === "join-logs")
        const user = member.user
        const joinembed = new Discord.MessageEmbed()
            .setTitle('Join Log')
            .setDescription(`<@${member.id}> has joined!`)
            .addField("Account Age", `${user.createdAt.toLocaleDateString()}`)
            .addField("User ID", `${member.id}`)
            .setThumbnail(user.displayAvatarURL())
            .setFooter('Made by Ddogwildone1')
            .setTimestamp()

        joinlogsChannel.send(joinembed)        
    })
}