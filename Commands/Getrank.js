var Discord = require('discord.js')
var rbxbot = require(`noblox.js`)
var config = require(`../config.json`)
const { prefix } = require('../config.json');

module.exports = {

    name: 'getrank',
    description: 'Get\'s a user\'s rank from the roblox group.',
    usage: `${prefix}getrank (username)`,

    async execute(message, args) {

        const robloxname = args[0]

        if (!robloxname) {
            message.reply("Please provide a username.")
        }
        if (!args[1]) {
            var groupid = config.GroupID
        } else {
            var groupid = args[1]
        }
        
        await rbxbot.getIdFromUsername(robloxname)
            .then(async (robloxid) => {
                rbxbot.getRankNameInGroup(groupid, robloxid)
                    .then((rankname) => {
                        message.reply(`${robloxname}'s rank is ${rankname}.`)
                    })
                    .catch((err) => {
                        message.reply('Either the specified group ID is not a group, or another error occured.')
                        console.log(err)
                    })
            })

    }

}