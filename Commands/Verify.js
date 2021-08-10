var Discord = require('discord.js')
var rbxbot = require(`noblox.js`)
var mongoose = require('mongoose')
const verifiedUserModel = require('../models/verifiedUser')
const { randomCode } = require(`../config.json`)
const mongo = require('../Alwaysrunning/mongo')


module.exports = {

    name: 'verify',
    description: 'Verify ......',

    async execute(message, args) {
        const number = Math.floor(Math.random() * 24) + 1
        const getRandomSentence = randomCode[number]
        const filter = (m) => m.author.id === message.author.id
        const newDiscordId = message.author.id
        message.reply(`To verify, put the following in the "About" section on your profile:\n\`${getRandomSentence}\`\n**Once done, reply with your username.**\nThis will automatically close in 5 minutes.`)
        message.channel.awaitMessages(filter, {max : 1 , time : 300000, errors:['time'] })
            .then((tempRobloxName) => {
                const newRobloxname = tempRobloxName.first().content
                rbxbot.getIdFromUsername(newRobloxname)
                    .then(async (tempRobloxId) => {
                        const newRobloxId = tempRobloxId
                        const playerinfo = await rbxbot.getBlurb({ userId: newRobloxId })
                        if (playerinfo === getRandomSentence) {
                            await mongo().then(async (mongoose) => {
                                try {
                                    await verifiedUserModel.findOneAndUpdate(
                                        {
                                            discordid: newDiscordId
                                        },{
                                            discordid: newDiscordId,
                                            robloxname: newRobloxname,
                                            robloxid: newRobloxId
                                        },{
                                            upsert: true
                                        }
                                    )
                                } catch (err) {
                                    console.log(err)
                                } finally {
                                    mongoose.connection.close()
                                    message.reply('Successfully verified! Use `>getroles` to get your correct roles.')
                                }                               
                            })
                            .catch(err => console.error(err))
                            
                        } else {
                            message.reply("Status didn't match the code provided.")
                        }
                    })
                    .catch((err) => {
                        message.reply("You've provided an incorrect username.")
                        console.log(err)
                    })
            })
            .catch((err) => {
                message.reply('Command cancelled.')
                console.log(err)
            })
    }
}
