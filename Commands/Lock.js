var Discord = require('discord.js')
const ignored = new Set([
])
const { prefix } = require('../config.json');

module.exports = {

    name: 'lock',
    description: `Sets all channels except specified channels so all users cannot speak in them. To unlock all of the channels after this is used, use ${prefix}unlock.`,
    usage: `${prefix}lock`,

    execute(message, args) {
        var logsChannel = message.channel.guild.channels.cache.find(r => r.name === "bot-logs")
        //if (message.guild.roles.cache.has('765389005084295229')) {
            const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category');
            channels.forEach(channel => {

                if (!ignored.has(channel.id)) {
                    channel.updateOverwrite(message.member.roles.cache.some(r => r.name === "everyone"), {
                        SEND_MESSAGES: false,
                        SPEAK: false,
                        ADD_REACTIONS: false
                    }).then(g => {
                        console.log(`Updated ${g.name} (${g.id})`);
                    }).catch(err => console.log(err));
                } else {
                    console.log(`Skipping ${channel.name} (${channel.id})`);
                }
            });
            const lockembed = new Discord.MessageEmbed()
                .setTitle('Channels Locked')
                .setDescription(`${message.author} has locked all channels!`)
                .addField(`>lock was used in ${message.channel.name}.`, '-')
                .setThumbnail(message.author.displayAvatarURL())
                .setFooter('Made by Ddogwildone1')
                .setTimestamp()

            logsChannel.send(lockembed)

        //}
    }

}