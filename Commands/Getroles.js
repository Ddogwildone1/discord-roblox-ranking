var Discord = require('discord.js')
var rbxbot = require(`noblox.js`)
var mongoose = require('mongoose')
var config = require(`../config.json`)
var { roleconfig } = require(`../bot`)
var mongo = require('../Alwaysrunning/mongo')
const verifiedUserModel = require('../models/verifiedUser')
const roleListTest = [
    '772517107853950999', 
    '772517114635878451',
    '772517109087469569',
    '772517110257418240',    
    '772517110541713408',
    '772517111427891220',
    '772517111489757206',
    '772517112501239818',
    '772517112522211418',
    '825217394044960770',
    '772517113239568385'
]


module.exports = {

    name: 'Getroles',
    description: 'Getroles ......',

    async execute(message, msg, bot) {
        const currentDiscordId = message.member.id
        const verifiedUser = await verifiedUserModel.findOne({ discordid: currentDiscordId }, (err, guild) => {
            if (err) console.log(err)
            if (!guild) {
                message.reply('You do not have a verified user attached to your account. Use `>verify` to add a new account.')
                return;
            }
        })
        const verifiedRobloxName = verifiedUser.robloxname
        const verifiedRobloxId = verifiedUser.robloxid
        console.log(verifiedUser)
        console.log(verifiedRobloxName)
        console.log(verifiedRobloxId)

        message.reply('This may take a while, up to a minute.')
        message.member.send('If you loose your permissions for more than one minute, contact Ddogwildone1.')
        await rbxbot.getRankNameInGroup(config.GroupID, verifiedRobloxId)
            .then(async (groupRank) => {
                console.log(groupRank)
                let verifiedRole = await message.guild.roles.cache.find((role) => {
                    return role.name === groupRank
                })
                var whileLoopLimit = 0
                while (whileLoopLimit < 11) {
                    await message.member.roles.remove(roleListTest[whileLoopLimit])
                    whileLoopLimit = whileLoopLimit + 1
                }
                if (groupRank === 'Guest') {
                    let ClassDRole = await message.guild.roles.cache.find((role) => {
                        return role.name === 'Class-D'
                    })
                    await message.member.roles.add(ClassDRole)
                    await message.member.setNickname(`${verifiedRobloxName} | Class-D`)
                } else {
                await message.member.roles.add(verifiedRole)
                await message.member.setNickname(`${verifiedRobloxName} | ${groupRank}`)
                }
                message.reply('Roles given!')
            }).catch((err) => console.log(err))

    }
}