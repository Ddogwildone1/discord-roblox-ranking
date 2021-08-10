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

  name: 'checkin',
  description: 'Checkin ......',

  async execute(message, args) {
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
                    guildid: message.channel.guild.id,
                    checkedintimestamp: checkedInTimestamp,
                    discordid: message.author.id,
                    guildname: message.guild.name
                  }, {
                    upsert: true
                  }
                  )
                  await mongo().then(async (mongoose) => {
                    try {
                      await timeLogModel.findOneAndUpdate(
                        {
                          guildid: message.channel.guild.id,
                          totaltime: 0.00,
                          discordid: message.author.id
                        }, {
                        guildid: message.channel.guild.id,
                        discordid: message.author.id
                      }, {
                        upsert: true
                      }
                      )
                    } catch (err) {
                      console.log(err)
                    } finally {
                    }
                  })
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
            setTimeout(() => {
              const guildname = newCheckedIn.guildname
              if (message.guild.name == guildname) {
                message.reply('You are already checked in. Try running `>checkout` first.')
              } else {
                message.reply(`You are already checked in. Server: \`${guildname}\``)
              }
            }, 100)
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
