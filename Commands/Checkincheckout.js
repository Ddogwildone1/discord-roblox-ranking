var Discord = require('discord.js')
var mongoose = require(`mongoose`)
var config = require(`../config.json`)
const mongo = require('../Alwaysrunning/mongo')
const timeLogModel = require('../models/timeLog')
const checkedInModel = require('../models/checkedIn')
var timestamp = Date.now()

function getTimestamp() {
  var timestamp = Date.now()
  return timestamp
}

module.exports = {

  name: 'Checkincheckout',
  description: 'Checkincheckout ......',

  async execute(message, msg) {
    if (msg.startsWith(">checkin")) {
      await mongo().then(async (mongoose) => {
        try {
          const currentCheckedIn = await checkedInModel.findOne({ discordid: message.author.id }, (err, guild) => {
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
    } else if (msg.startsWith(">checkout")) {
      await mongo().then(async (mongoose) => {
        try {
          const currentCheckedIn = await checkedInModel.findOne({ discordid: message.author.id }, (err, guild) => {
            if (err) return console.log(err)
            if (!guild) {
              message.reply("You aren't checked in.")
              return;
            } else {
              const checkedInTimestamp = currentCheckedIn.checkedintimestamp
              const checkedInGuildId = currentCheckedIn.guildid
              let tempTimestamp = getTimestamp()
              const checkedOutTimestamp = tempTimestamp
              if (checkedInGuildId == message.channel.guild.id) {
                console.log('Correct Guild.')
                let time1 = checkedInTimestamp - checkedOutTimestamp
                let time2 = time1 * 2
                let time3 = time1 - time2
                let time4 = time3 - 1
                let time5 = time4 / 1000
                let time6 = time5 / 60
                let totalTime = time6.toFixed(2)
                const connectToMongoDB = async () => {
                  await mongo().then(async (mongoose) => {
                    try {
                      await timeLogModel.findOneAndUpdate(
                        {
                          discordid: message.author.id
                        }, {
                        discordid: message.author.id,
                        totaltime: totalTime,
                        guildid: message.channel.guild.id
                      }, {
                        upsert: true
                      }
                      )
                    } catch (err) {
                      console.log(err)
                    } finally {
                      mongoose.connection.close()
                      message.reply(`${totalTime} minutes.`)
                    }
                  })
                }
                connectToMongoDB()
              } else {
                console.log('Incorrect Guild.')
                message.reply('You are already checked-in in another server! Checkout there first before attempting to checkin here.')
                return;
              }
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
}
