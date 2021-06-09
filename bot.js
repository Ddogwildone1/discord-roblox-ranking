
//#region Refering to the packages

require('dotenv').config()
var Discord = require('discord.js');
var rbxbot = require('noblox.js');
var bot = new Discord.Client();
const fs = require('fs');
var config = require('./config.json');
const { time } = require('console');
bot.commands = new Discord.Collection();
const commandfiles = fs.readdirSync('./Commands/').filter(file => file.endsWith('.js'));
const cooldown = new Set();

for (const file of commandfiles) {
    const command = require(`./Commands/${file}`);
    bot.commands.set(command.name, command);
}


const joinlog = require('./Alwaysrunning/Joinlogs')
const mongo = require('./Alwaysrunning/mongo')

//#endregion

// Message listener
bot.on('message', (message) => {

    //#region Command list + variables
    var msg = message.content.toLowerCase()
    var prefix = '>'
    var args = message.content.split(/ +/)

    if (message.author.bot) return; // Ignore bot's own messages
    if (message.channel.type === 'dm') return; // Ignores DMs

    if (msg.startsWith(prefix + 'test')) {
        bot.commands.get('Test').execute(message, msg);
        return;
    }

    if (msg.startsWith(prefix + 'userinfo')) {
        bot.commands.get('UserInfo').execute(message, msg, args);
        return;
    }

    if (msg.startsWith(prefix + 'getrank')) {
        bot.commands.get('Getrank').execute(message, msg, args)
        return;
    }

    if (msg.startsWith(prefix + 'getroles')) {
        bot.commands.get('Getroles').execute(message, msg)
        return;
    }

    if (msg.startsWith(prefix + 'list')) {

        if (cooldown.has(message.author.id)) {
            message.delete()
            message.reply("This command is on cooldown. (Cooldown is 5 minutes.)")
                .then((m) => m.delete({ timeout: 300000 }))
            return;
        }
        else {
            if (message.member.roles.cache.has("794686535982383125")) {
                bot.commands.get('List').execute(message, msg);
                cooldown.add(message.author.id);
                setTimeout(() => {
                    cooldown.delete(message.author.id)
                }, 300000)
                return;
            }
            else {
                message.reply('You do not have the required role(s) to preform this action. (Rank Updater)')
                return;
            }
        }
    }

    if (msg.startsWith(prefix + 'rank')) {
        if (message.member.roles.cache.has("794686535982383125")) {
            bot.commands.get('Rank').execute(message, msg, args, config);
            return;
        }
        else {
            message.reply('You do not have the required role(s) to preform this action. (Rank Updater)')
            return;
        }
    }

    if (msg.startsWith(prefix + 'suggestion')) {
        bot.commands.get('Suggestion').execute(message, msg, args)
        return;
    }

    if (msg.startsWith(prefix + 'purge')) {
        if (message.member.hasPermission('MANAGE_MESSAGES')) {
            bot.commands.get('Purge').execute(message, msg, args);
            return;
        }
        else {
            message.reply('You do not have the required permission(s) to preform this action. (Manage Messages)')
            return;
        }
    }

    if (msg.startsWith(prefix + 'help')) {
        bot.commands.get('Help').execute(message, msg);
        return;
    }

    if (msg.startsWith(prefix + 'unlock')) {
        if (message.member.hasPermission('MANAGE_CHANNELS')) {
            bot.commands.get('Unlock').execute(message, msg);
            return;
        }
        else {
            message.reply('You do not have the required permission(s) to preform this action. (Manage Channels)')
            return;
        }
    }

    if (msg.startsWith(prefix + 'lock')) {
        if (message.member.hasPermission('MANAGE_CHANNELS')) {
            bot.commands.get('Lock').execute(message, msg);
            return;
        }
        else {
            message.reply('You do not have the required permission(s) to preform this action. (Manage Channels)')
            return;
        }
    }

    if (msg.startsWith(prefix + 'verify')) {
        bot.commands.get('Verify').execute(message, msg, bot);
        return;
    }

    if (msg.startsWith(prefix + 'checkout')) {
        bot.commands.get('Checkout').execute(message, msg, args, config);
        return;
    }

    if (msg.startsWith(prefix + 'checkin')) {
        bot.commands.get('Checkin').execute(message, msg, args, config);
        return;
    }

    /*
    if (msg.startsWith(prefix + 'rank')) {
        if (message.member.roles.cache.has("794686535982383125")) {
            bot.commands.get('Rank').execute(message, msg, args, config);
            return;
        }
        else {
            message.reply('You do not have the required role(s) to preform this action. (Rank Updater)')
            return;
        }
    }
    */

    /*if (msg.startsWith(prefix + '')) {
        bot.commands.get('').execute(message, msg)
        return
    }*/

    if (msg.startsWith(prefix + " ")) {
        return;
    }

    if (msg.startsWith(prefix)) {
        message.delete()
        message.reply("Invalid command.")
            .then((m) => m.delete({ timeout: 5000 }))
    }

});
//#endregion

//#region Terminal reply + continuous commands
bot.on('ready', async () => {

    bot.user.setActivity(">help -------------------------------- Bot made by Ddogwildone1.", { type: "LISTENING" })
    await rbxbot.setCookie(process.env.Cookie);
    //joinlog(bot)
    await mongo().then(mongoose => {
        try {
            console.log('Connected to mongo!')
        } catch (err) {
            console.log(err)
        } finally {
            mongoose.connection.close()
        }
    })
    console.log("The Bot has started.")
    // Code to Run when the Bot Logs in
});
//#endregion

//#region Bot Login
bot.login(process.env.Cookie)
bot.login(process.env.Token)
//#endregion
