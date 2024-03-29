var Discord = require('discord.js')
const ytdl = require('ytdl-core')
const ytSearch = require('yt-search')
const ffmpeg = require('ffmpeg-static')
const { prefix } = require('../config.json');

module.exports = {

    name: 'play',
    description: `Joins the current Voice Chat, then starts playing the specified song from YouTube. To make it stop early, use ${prefix}leave.`,
    usage: `${prefix}play (title**/**link)`,

    async execute(message, args) {
        const voiceChannel = message.member.voice.channel
 
        if (!voiceChannel) return message.channel.send('You need to be in a channel to execute this command!')
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('You dont have the correct permissions')
        if (!permissions.has('SPEAK')) return message.channel.send('You dont have the correct permissions')
        if (!args.length) return message.channel.send('You need to send the second argument!')

        const validURL = (str) => {
            var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
            if(!regex.test(str)){
                return false;
            } else {
                return true;
            }
        }
 
        if (validURL(args[0])) {
 
            const  connection = await voiceChannel.join();
            const stream  = ytdl(args[0], {filter: 'audioonly'});
 
            connection.play(stream, {seek: 0, volume: 1})
            .on('finish', () =>{
                voiceChannel.leave();
            });
 
            await message.reply(`Now Playing ***Your Link!***`)
 
            return
        }
 
        const videoFinder = async (query) => {
            const videoResult = await ytSearch(query)
 
            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null
 
        }
 
        const video = await videoFinder(args.join(' '))
 
        if(video){
            const connection = await voiceChannel.join()
            const stream = ytdl(video.url, {filter: 'audioonly'})
            connection.play(stream, {seek: 0, volume: 1})
            .on('finish', () =>{
                voiceChannel.leave()
            });
 
            await message.reply(`Now Playing ***${video.title}***`)
        } else {
            message.channel.send('No video results found')
        }
    }

}

