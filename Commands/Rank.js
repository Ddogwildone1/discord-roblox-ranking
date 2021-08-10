var Discord = require('discord.js')
var rbxbot = require(`noblox.js`)
var config = require(`../config.json`)

module.exports = {

    name: 'rank',
    description: 'Rank ......',

    async execute(message, args) {

        var suggestionChannel = message.channel.guild.channels.cache.find(r => r.name === "join-logs")
        const robloxname = args[0]
        const robloxid = await rbxbot.getIdFromUsername(robloxname)
            .then(async (robloxid) => {

                const rank = parseInt(args[1])

                await rbxbot.setRank({ group: config.GroupID, target: robloxid, rank: rank })
                    .then(async () => {
                        const rankname = await rbxbot.getRankNameInGroup(config.GroupID, robloxid)
                        message.reply(`Succesfully ranked **${robloxname}** to **${rankname}**.`)
                        const rankembed = new Discord.MessageEmbed()
                            .setTitle('Rank Log')
                            .setDescription(`${message.author} has ranked a user!`)
                            .addField("User Ranked", `${robloxname}`)
                            .addField("Rank Name", `${rankname}`)
                            .setThumbnail(message.author.displayAvatarURL())
                            .setFooter('Made by Ddogwildone1')
                            .setTimestamp()

                        suggestionChannel.send(rankembed)
                    })
                    .catch((err) => {
                        message.reply('An error occured while ranking this user.')
                        console.log(err)
                    })
            })

            .catch((err) => {

                message.reply('`Username` was not defined.')
                console.log(err)
            })
        
        

    }

}
