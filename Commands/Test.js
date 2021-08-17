var Discord = require('discord.js')

module.exports = {

    name: 'test',
    description: 'Test ......',

    execute(message, args) {
        message.reply('Bot is online.')
    }
}
