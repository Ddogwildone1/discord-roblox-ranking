var Discord = require('discord.js');
const fs = require('fs');
const { prefix } = require('../config.json');

module.exports = {

    name: 'help',
    description: 'Displays all available commands, or a specific command.',
    usage: `${prefix}help [command]`,

    execute(message, args) {
        commands = new Discord.Collection();
        const commandfiles = fs.readdirSync('./Commands/').filter(file => file.endsWith('.js'));
        for (const file of commandfiles) {
            const commmand = require(`../Commands/${file}`);
            commands.set(commmand.name, commmand);
        }
        if (!args[0]) {
            const embed = new Discord.MessageEmbed()
                .setColor("#002DD4")
                .setTitle('All available commands')
                .setDescription(`Use \`${prefix}help (command)\` to find more info for each command.`)

            commands.forEach((command) => {
                embed.addField(command.name, command.usage)
            })
            message.channel.send(embed);
        } else {
            const command = commands.has(args[0]);
            if (command) {
                const cmd = commands.get(args[0])
                const embed = new Discord.MessageEmbed()
                    .setColor("#002DD4")
                    .setTitle(`Information about ${prefix}${cmd.name}`)
                    .setDescription(`Usage: ${cmd.usage}`)
                    .addField(`Description:`, `${cmd.description}`)
                message.channel.send(embed)
            } else {
                message.reply('That command does not exist!')
            }
        }
    }
}