var Discord = require('discord.js')
const ignored = new Set([
    '846925095339163668'
])

module.exports = {

    name: 'unlock',
    description: 'Unlock ......',

    execute(message, args) {

        if (message.guild.roles.cache.has('765389005084295229')) {
            var logsChannel = message.channel.guild.channels.cache.find(r => r.name === "join-logs")
            const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category');
            channels.forEach(channel => {

                if (!ignored.has(channel.id)) {
                    channel.updateOverwrite('765389005084295229', {
                        SEND_MESSAGES: null,
                        SPEAK: null,
                        ADD_REACTIONS: null
                    }).then(g => {
                        console.log(`Updated ${g.name} (${g.id})`);
                    }).catch(err => console.log(err));
                } else {
                    console.log(`Skipping ${channel.name} (${channel.id})`);
                }
            });
            const unlockembed = new Discord.MessageEmbed()
                .setTitle('Channels Unlocked')
                .setDescription(`${message.author} has unlocked all channels!`)
                .addField(`>unlock was used in ${message.channel.name}.`, '-')
                .setThumbnail(message.author.displayAvatarURL())
                .setFooter('Made by Ddogwildone1')
                .setTimestamp()

            logsChannel.send(unlockembed)
        }
    }

}