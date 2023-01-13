var Discord = require('discord.js')
const { prefix } = require('../config.json');

module.exports = {

    name: 'leave',
    description: `Leaves the current Voice Chat. Used in conjunction with ${prefix}play.`,
    usage: `${prefix}leave`,

    async execute(message, args) {
        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel) return message.channel.send("You need to be in a voice channel to stop the music!");
        await voiceChannel.leave();
        await message.channel.send('Leaving channel!')
    }

}

