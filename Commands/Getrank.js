var Discord = require('discord.js')
var rbxbot = require(`noblox.js`)
var config = require(`../config.json`)

module.exports = {

    name: 'Getrank',
    description: 'Getrank ......',

    async execute(message, msg, args) {

        const robloxname = args[1]

        if (!robloxname) {
            message.reply("Please provide a username.")
        }

        await rbxbot.getIdFromUsername(robloxname)
            .then(async (robloxid) => {
                rbxbot.getRankNameInGroup(config.GroupID, robloxid)
                    .then((rankname) => {
                        message.reply(`${robloxname}'s rank is ${rankname}.`)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })

    }

}