var Discord = require('discord.js')
var mongoose = require(`mongoose`)
var config = require(`../config.json`)

module.exports = {

    name: 'Resettime',
    description: 'Resettime ......',

    execute(message, msg) {
        message.reply("Command under development.")
    }

}