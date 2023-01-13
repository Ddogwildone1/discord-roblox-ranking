var Discord = require('discord.js')
const suggestiontickets = new Map();
const { prefix } = require('../config.json');

module.exports = {

    name: 'suggestion',
    description: 'Sends a suggestion embed into the specified channel. Title and description are specified after you run the command.',
    usage: `${prefix}suggestion`,

    async execute(message, args) {

        if (suggestiontickets.has(message.author)) return message.member.send("You cannot create a new suggestion.")

        
        const filter = (m) => m.author.id === message.author.id
        suggestiontickets.set(message.author, message)

        console.log(suggestiontickets)
        let msg1 = await message.reply("What do you what the title of your suggestion to be?")
        let response1 = await (message.channel.awaitMessages(filter, { max: 1 }))
            .then(async (response1) => {
                
                
                let msg2 = await message.reply("What do you want the description of your suggestion to be?")
                let response2 = await (message.channel.awaitMessages(filter, { max: 1 }))
                    .then(async (response2) => {
                        
                        
                        const suggestionembed = new Discord.MessageEmbed()
                            .setTitle(`${message.author.tag}'s Suggestion`)
                            .addField('Suggestion Title \n', response1.first().content)
                            .addField('Suggestion Description \n', response2.first().content)

                        let msg3 = await message.reply('Are you sure you want to post your suggestion? Reply with `Yes/No`')
                        let response3 = await (message.channel.awaitMessages(filter, { max: 1 }))
                            .then(async (response3) => {
                                if (response3.first().content.toLowerCase() === 'yes') {
                                    const suggestionchannel = await message.channel.guild.channels.cache.find(r => r.name === "bot-commands")
                                    let suggestion = await suggestionchannel.send(suggestionembed)
                                    
                                    

                                    setTimeout(() => {
                                        suggestiontickets.delete(message.author)
                                    }, 5000)
                                    return;
                                }
                                message.reply('Suggestion cancelled.')
                                
                            })

                    })
                    .catch((err) => console.log(err))
            })
    }

}