var Discord = require('discord.js')
var mongoose = require(`mongoose`)
var config = require(`../config.json`)

module.exports = {

    name: 'Checkout',
    description: 'Checkout ......',

    execute(message, msg) {
        message.reply("Command under development.")
    }

}