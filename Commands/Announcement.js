var Discord = require('discord.js')
const announcementtickets = new Map();
var announcementChannel = undefined

module.exports = {

    name: 'announcement',
    description: 'Announcement ......',

    async execute(message, args) {

        if (message.member.roles.cache.some(r => r.name === "Bot Admin")) {
            message.reply("You do not have the correct role(s) to run this command. (Bot Admin)")
            return;
        }

        if (announcementtickets.has(message.author)) return message.reply("Announcement cooldown. (30 seconds)")
        const filter = (m) => m.author.id === message.author.id
        if (!message.mentions.channels.first()) {
            message.reply("Usage: `>announcement #(channel)`")
            return;
        } else {
            announcementChannel = message.mentions.channels.first()
        }
        announcementtickets.set(message.author, message)

        let msg1 = await message.reply("Do you want to ping here, everyone, a role, or none?\nValid responses: \`here, everyone, @role, none\`")
        let response1 = await (message.channel.awaitMessages(filter, { max: 1 }))
            .then(async (response1) => {

                let msg3 = await message.reply("What do you want the title of your announcement to be? (Less than 256 characters.)")
                let response3 = await (message.channel.awaitMessages(filter, { max: 1 }))
                    .then(async (response3) => {

                        let msg4 = await message.reply("What do you want the description of your announcement to be? (Less than 2048 characters.)")
                        let response4 = await (message.channel.awaitMessages(filter, { max: 1 }))
                            .then(async (response4) => {

                                if (response1.first().content.toLowerCase() === 'here') {
                                    var mentionRole = '@here'
                                } else if (response1.first().content.toLowerCase() === 'everyone') {
                                    var mentionRole = '@everyone'
                                } else if (response1.first().content.toLowerCase() === 'none') {
                                    var mentionRole = 'none'
                                } else {
                                    var mentionRole = response1.first().content
                                }

                                const announcementembed = new Discord.MessageEmbed()
                                    .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
                                    .setColor('#FFFFFF')
                                    .setTitle(response3.first().content)
                                    .setDescription(response4.first().content)
                                    .setFooter('Intvrstellar\'s Foundation')
                                    .setTimestamp()

                                console.log(mentionRole)
                                message.channel.send(announcementembed)
                                let msg5 = await message.reply('Are you sure you want to post your announcement? Reply with `Yes/No`')
                                let response5 = await (message.channel.awaitMessages(filter, { max: 1 }))
                                    .then(async (response5) => {
                                        if (response5.first().content.toLowerCase() === 'yes') {
                                            if (mentionRole === 'none') {
                                                let suggestion = await announcementChannel.send(announcementembed)
                                                console.log('Used option none!')
                                            } else if (mentionRole === '@here') {
                                                let suggestion = await announcementChannel.send('@here,', announcementembed)
                                                console.log('Used option @here!')
                                            } else if (mentionRole === '@everyone') {
                                                let suggestion = await announcementChannel.send('@everyone,', announcementembed)
                                                console.log('Used option @everyone!')
                                            } else {
                                                let suggestion = await announcementChannel.send(mentionRole, announcementembed)
                                                console.log('Used option role!')
                                            }

                                            setTimeout(() => {
                                                announcementtickets.delete(message.author)
                                            }, 30000)
                                            return;
                                        }
                                        message.reply('Announcement cancelled.')

                                    })

                            })
                            .catch((err) => console.log(err))
                    })

            })
    }

}