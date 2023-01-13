//#region Refering to the packages
require('dotenv').config()
var Discord = require('discord.js');
var rbxbot = require('noblox.js');
var config = require('./config.json');
const client = new Discord.Client();
const fs = require('fs');
client.commands = new Discord.Collection();
const commandfiles = fs.readdirSync('./Commands/').filter(file => file.endsWith('.js'));
for (const file of commandfiles) {
    const command = require(`./Commands/${file}`);
    client.commands.set(command.name, command);
}
const joinlog = require('./Alwaysrunning/Joinlogs')
const mongo = require('./Alwaysrunning/mongo')
const playaudio = require('./Alwaysrunning/Playaudio')
joinlog(client)
// playaudio(bot)
var prefix = config.prefix
//#endregion



// Message listener
client.on('message', (message) => {

    //#region Command list + variables
    if (message.author.bot || message.channel.type == 'dm' || !message.content.startsWith(prefix)) return;
    var args = message.content.slice(prefix.length).trim().split(/ +/)
    var command = args.shift().toLowerCase()
    if (!client.commands.has(command)) return;
    try {
        client.commands.get(command).execute(message, args)
    } catch (err) {
        console.log(err)
    }

});
//#endregion

//#region Terminal reply + continuous commands
client.on('ready', async () => {
    client.user.setActivity(`${prefix}help`, { type: "LISTENING" })
    //await rbxbot.setCookie(process.env.Cookie);
    /*await mongo().then(mongoose => {
        try {
            console.log('Connected to mongo!')
        } catch (err) {
            console.log(err)
        } finally {
            mongoose.connection.close()
        }
    })*/
    console.log("The Bot has started.")
    const logsChannel = client.channels.cache.get('846821373917134898')
    logsChannel.send("Bot has been restarted.")
    // Code to Run when the Bot Logs in
});
//#endregion

//#region Bot Login
client.login(process.env.Cookie)
client.login(process.env.Token)
//#endregion