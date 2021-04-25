var Discord = require('discord.js')
const ignored = new Set([
    '765389005084295233',
    '772964685463945227',
    '772965085077307403',
    '772994537881600001',
    '773007924842070066',
    '773007969498955797',
    '787352328763736095',
    '782753075239845908',
    '772960807876689941',
    '787196017178443776',
    '773011073950941216',
    '787062578182488064',
    '787064068103602238',
    '787064111858188318',
    '787064166287933441',
    '802065334588801054'
])


module.exports = {

    name: 'Lock',
    description: 'Lock ......',

    execute(message, msg) {
        var logsChannel = message.channel.guild.channels.cache.get('773011073950941216')
        if (message.guild.roles.cache.has('765389005084295229')) {
            const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category');
            channels.forEach(channel => {

                if (!ignored.has(channel.id)) {
                    channel.updateOverwrite('765389005084295229', {
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

        }
    }

}