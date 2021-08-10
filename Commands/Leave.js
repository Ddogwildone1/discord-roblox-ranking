var Discord = require('discord.js')

module.exports = {

    name: 'leave',
    description: 'Leave ......',

    async execute(message, args) {
        const voiceChannel = message.member.voice.channel;

        console.log(voiceChannel)
        if(!voiceChannel) return message.channel.send("You need to be in a voice channel to stop the music!");
        await voiceChannel.leave();
        await message.channel.send('Leaving channel!')
    }

}

