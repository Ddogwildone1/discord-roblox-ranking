const Discord = require('discord.js')
const ytdl = require('ytdl-core')
const ytSearch = require('yt-search')
const ffmpeg = require('ffmpeg-static')
const path = require('path')
var soundVoiceChannel = 0
var soundDispatcher = 0
//#region selections
const personToCut = '430465460803469322'
const targetChannel = '846937874880135208'
//#endregion

module.exports = (bot) => {
    bot.on('voiceStateUpdate', async (oldState, newState) => {
        if (oldState.id != personToCut) return;
        if (oldState.channelID != newState.channelID) {
            if (newState.channelID === targetChannel) {
                let test1 = bot.guilds.cache.get('765389005084295229')
                let test2 = test1.members.cache.get(newState.id)
                const selectedVoiceChannel = test2.voice.channel
                const dispatcher = selectedVoiceChannel.join().then((connection) => {
                    soundVoiceChannel = connection
                })
                soundDispatcher = dispatcher
            } else if (newState.channelID === null && oldState.channelID === targetChannel) {
                let test1 = bot.guilds.cache.get('765389005084295229')
                const selectedVoiceChannel = test1.channels.cache.get(oldState.channelID)
                selectedVoiceChannel.leave()
            }
        } else {
            console.log('skipping')
        }
    })
    bot.on('guildMemberSpeaking', (member, speaking) => {
        if (member.id == personToCut) {
            if (speaking.bitfield == 1) {
                console.log('test1')
                soundVoiceChannel.play(path.join(__dirname, '6878568731.mp3'))
            } else if (speaking.bitfield == 0) {
                console.log('test2')
                dispatcher.pause()
            }
        }
    })
}