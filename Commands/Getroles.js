var Discord = require('discord.js')
var rbxbot = require(`noblox.js`)
var mongoose = require('mongoose')
var config = require(`../config.json`)
var mongo = require('../Alwaysrunning/mongo')
const verifiedUserModel = require('../models/verifiedUser')
const roleListTest = [
    "860182762744053780",
    "860182682738884628",
    "859279089504747531",
    "859279048109719552",
    "859279006683889664",
    "860182636369936404"
]


module.exports = {

    name: 'getroles',
    description: 'Getroles ......',

    async execute(message, args) {
        const currentDiscordId = message.member.id
        await mongo().then(async (mongoose) => {
            try {
                const verifiedUser = await verifiedUserModel.findOne({ discordid: currentDiscordId }, (err, guild) => {
                    if (err) console.log(err)
                    if (!guild) {
                        message.reply('You do not have a verified user attached to your account. Use `>verify` to add a new account.')
                        return;
                    }
                })
                const verifiedRobloxName = verifiedUser.robloxname
                const verifiedRobloxId = verifiedUser.robloxid

                message.reply('This may take a while, up to a minute.')
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
                                return role.name === 'Member'
                            })
                            await message.member.roles.add(ClassDRole)
                            await message.member.setNickname(`${verifiedRobloxName} | Member`)
                        } else {
                            await message.member.roles.add(verifiedRole)
                            await message.member.setNickname(`${verifiedRobloxName} | ${groupRank}`)
                        }
                        message.reply('Roles given!')
                    }).catch((err) => console.log(err))
            } catch (err) {
                console.log(err)
            } finally {
                mongoose.connection.close()
            }
        })
    }
}