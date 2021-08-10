var Discord = require('discord.js')
var Roblox = require('noblox.js')
var { GroupID } = require('../config.json')

module.exports = {

    name: 'test',
    description: 'Test ......',

    execute(message, args) {
        message.reply('Bot is online.')
    }
}
