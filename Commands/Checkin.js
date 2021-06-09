var Discord = require('discord.js')
var mongoose = require(`mongoose`)
var config = require(`../config.json`)
const mongo = require('../Alwaysrunning/mongo')
const timeLogModel = require('../models/timeLog')
const checkedInModel = require('../models/checkedIn')

function getTimestamp() {
  var timestamp = Date.now()
  return timestamp
}

module.exports = {

  name: 'Checkin',
  description: 'Checkin ......',

  async execute(message, msg) {
    await mongo().then(async (mongoose) => {
      try {
        const newCheckedIn = await checkedInModel.findOne({ discordid: message.author.id }, (err, guild) => {
          if (err) console.log(err);
          if (!guild) {
            let tempTimestamp = getTimestamp()
            const checkedInTimestamp = tempTimestamp
            const connectToMongoDB = async () => {
              await mongo().then(async (mongoose) => {
                try {
                  await checkedInModel.findOneAndUpdate(
                    {
                      discordid: message.author.id
                    }, {
                    discordid: message.author.id,
                    checkedintimestamp: checkedInTimestamp,
                    guildid: message.channel.guild.id
                  }, {
                    upsert: true
                  }
                  )
                } catch (err) {
                  console.log(err)
                } finally {
                  mongoose.connection.close()
                  message.reply('Checked in!')
                }
              })
            }
            connectToMongoDB()
          } else {
            message.reply('You are already checked in.')
            return;
          }
        })
      } catch (err) {
        console.log(err)
      } finally {
        mongoose.connection.close()
      }
    })
  }
}
