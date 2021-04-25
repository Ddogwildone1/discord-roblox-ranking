var Discord = require('discord.js')

module.exports = {

    name: 'Help',
    description: 'Help .....',

    execute(message, msg) {
        message.delete()
        message.reply("A DM has been sent to you containing the list of all the commands this bot has.")
            .then((m) => m.delete({ timeout: 5000 }))

        const commandsembed = new Discord.MessageEmbed()
            .setTitle('Commands')
            .setDescription("List of commands for Ddogwildone1's SCP:F.")
            .addField("`>help`", "Displays this embed.")
            .addField("`>test`", "Ensures this bot is online.")
            .addField("`>userinfo (@user)`", "Displays specified user's information.")
            .addField("`>suggestion`", "Put a suggestion in #suggestions.")
            .addField("`>getrank (username)`", "Gets and displays the specified user's rank.")
            .addField("`>verify`", "Links a user's Roblox account with their Discord account. Needs only one use, and works in conjunction with >getroles.")
            .addField("`>getroles`", "Gives you the correct roles based off of what rank you are in the Roblox group.")
            .addField("-----Admin Commands-----", "-----------------------------------------------------------")
            .addField("`>purge (number)`", "Deletes the specified amount of messages from that channel.")
            .addField("`>rank (username) (rankID)`", "Ranks specified user to specified rank in the main group.")
            .addField("`>list`", "Lists each rank in the roblox group with a Rank ID and a description.")
            .addField("`>lock`", "Locks all available channels.")
            .addField("`>unlock`", "Unlocks all available channels.")
            .addField("Unfinished/disabled commands:", ">checkin, >checkout, >totaltime, >resettime")
            .setFooter('Made by Ddogwildone1')
            .setTimestamp()

        message.author.send(commandsembed)
    }

}