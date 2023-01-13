var Discord = require('discord.js')
const { prefix } = require('../config.json');

module.exports = {

    name: 'test',
    description: 'Replies if the bot is online.',
    usage: `${prefix}test`,

    execute(message, args) {
        message.reply('Bot is online.')
    }
}
