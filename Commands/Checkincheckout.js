var Discord = require('discord.js')
var mongoose = require(`mongoose`)
var config = require(`../config.json`)

module.exports = {

  name: 'Checkincheckout',
  description: 'Checkincheckout ......',

  execute(message, msg) {
    if (message.startsWith(">checkin")) {
      message.reply("Checkin was called.")
    } else if (message.startsWith(">checkout")) {
      message.reply("Checkout was called.")
    } else {
      message.reply("An error has occured. Check the console.")
    }
  }
}

