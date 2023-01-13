var Discord = require('discord.js')
var mongoose = require(`mongoose`)
var config = require(`../config.json`)
const mongo = require('../Alwaysrunning/mongo')
const timeLogModel = require('../models/timeLog')
const checkedInModel = require('../models/checkedIn')
const { prefix } = require('../config.json');

function getTimestamp() {
  var timestamp = Date.now()
  return timestamp
}

module.exports = {

  name: 'checkout',
  description: 'Stops the timer for the activity logger.',
  usage: `${prefix}checkout`,

  async execute(message, args) {
    await mongo().then(async (mongoose) => {

      const currentCheckedIn = await checkedInModel.findOne({ discordid: message.author.id }, (err, guild) => {
        if (err) return console.log(err)
        if (!guild) {
          message.reply("You aren't checked in.")
          return;
        }
      })

      const previousTimeLog = await timeLogModel.findOne({ guildid: message.channel.guild.id, discordid: message.author.id }, (err, guild) => {
        if (err) return console.log(err)
        if (!guild) {
          console.log('User does not have previous time log.')
          message.reply('You haven\'t checked in here before! Try running `>checkin` first.')
        }
      })

      const checkedInTimestamp = currentCheckedIn.checkedintimestamp
      const checkedInGuildId = currentCheckedIn.guildid
      const previousTotalTime = previousTimeLog.totaltime
      let tempTimestamp = getTimestamp()
      const checkedOutTimestamp = tempTimestamp
      if (checkedInGuildId == message.channel.guild.id) {
        let time1 = checkedInTimestamp - checkedOutTimestamp
        let time2 = time1 * 2
        let time3 = time1 - time2
        let time4 = time3 - 1
        let time5 = time4 / 1000
        let time6 = time5 / 60
        let totalTime = time6.toFixed(2)
        if (!previousTotalTime) {
          let timeToLog = totalTime
          const connectToMongoDB = async () => {
            await mongo().then(async (mongoose) => {
              try {
                await timeLogModel.findOneAndUpdate(
                  {
                    guildid: message.channel.guild.id,
                    discordid: message.author.id
                  }, {
                  guildid: message.channel.guild.id,
                  totaltime: timeToLog,
                  discordid: message.author.id
                }, {
                  upsert: true
                }
                )
                await checkedInModel.findOneAndDelete({ discordid: message.author.id })
              } catch (err) {
                console.log(err)
              } finally {
                mongoose.connection.close()
                message.reply(`Checked out!\n\`${totalTime}\` minutes.\nTotal minutes: \`${timeToLog}\``)
              }
            })
          }
          connectToMongoDB()
        } else if (previousTotalTime == previousTotalTime) {

          let time7 = parseFloat(previousTotalTime, 10)
          let time8 = parseFloat(totalTime, 10)
          let time9 = time8 + time7
          const timeToLog = time9.toFixed(2)
          const connectToMongoDB = async () => {
            await mongo().then(async (mongoose) => {
              try {
                await timeLogModel.findOneAndUpdate(
                  {
                    guildid: message.channel.guild.id,
                    discordid: message.author.id
                  }, {
                  guildid: message.channel.guild.id,
                  totaltime: timeToLog,
                  discordid: message.author.id
                }, {
                  upsert: true
                }
                )
                await checkedInModel.findOneAndDelete({ discordid: message.author.id })
              } catch (err) {
                console.log(err)
              } finally {
                mongoose.connection.close()
                message.reply(`Checked out!\n\`${totalTime}\` minutes.\nTotal minutes: \`${timeToLog}\``)
              }
            })
          }
          connectToMongoDB()
        }
      } else {
        const guildname = currentCheckedIn.guildname
        message.reply(`You are already checkedin in another server! Checkout there first before attempting to checkin here. Server: \`${guildname}\``)
        return;
      }

    })

  }
}
