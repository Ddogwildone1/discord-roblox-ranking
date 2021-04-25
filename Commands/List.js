var Discord = require('discord.js')

module.exports = {

    name: 'List',
    description: 'List ......',

    execute(message, msg) {
        const embed = new Discord.MessageEmbed()
            .setTitle('Rank List')
            .setDescription('Displays Rank IDs and Names')
            .addField('Class-D', 'Rank ID: `1` \nDescription: `Test subjects. First rank, given upon joining the group.`')
            .addField('Class-E', 'Rank ID: `2` \nDescription: `Suspended rank. Foundation personnel that have broken many rules are placed here.`')
            .addField('Class-A `DO NOT RANK USERS TO CLASS-A UNLESS GIVEN EXPLICIT PERMISSION FROM THE ADMINISTRATOR.`', 'Rank ID: `3` \nDescription: `Friends of the Administrator, or retired O5-X+. Exempt from all rules, with the exception of a few rules listed in a channel only given access to Class-A and O5+.`')
            .addField('Level-0', 'Rank ID: `4` \nDescription: `Brand new foundation personnel. Given low access to areas around the site, limited amount of departments to join.`')
            .addField('Level-1', "Rank ID: `5` \nDescription: `Getting to know the Foundation's rules. Given more clearance than Level-0, but still not much. Can join more departments.`")
            .addField('Level-2', 'Rank ID: `6` \nDescription: `Knows most founation rules. Given decent site clearance, no access to SCPs. Can join most departments.`')
            .addField('Level-3', 'Rank ID: `7` \nDescription: `Experienced foundation personnel. Knows how the sites runs well. Given clearance to many areas, and LCZ and Safe SCPs within reason. Can join all departments. If an O5 secretary is below L-3, they will be ranked L-3 when given O5 secretary.`')
            .addField('Level-4 `Only Site Director+ may rank users to L-4.`', "Rank ID: `8` \nDescription: `MaD, High ranking personnel, AD in a department, retired O5s, or the Overseer Head's secretary. Knows how the site works, and given clearance to more areas. LCZ and MCZ access, but only Safe and Euclid SCPs. O5-X's secretary will be placed here.`")
            .addField('Level-5 `Only Overseer Council+ may rank users to L-5.`', "Rank ID: `9` \nDescription: `Director in a department, or The Administrator's secretary. Access to all containment zones, may access all SCPs except for a few in HCZ. Exempt from minor rules stated in the Foundation Guidelines and CoE.`")
            .addField('Site Director `Only O5-X+ may rank users to SiD.`', 'Rank ID: `10` \nDescription: `Level-4, sometimes Level-3 personnel elected to become a Site Director. Trusted members. Everyone at and above this rank may access all SCPs. Exempt from a few rules stated in the Foundation Guidelines and CoE. May exempt others from rules stated in the Guidelines and CoE for events only.`')
            .addField('Overseer Council `Only O5-X+ may rank users to O5.`', 'Rank ID: `11` \nDescription: `Overseer of a department. Exempt from most rules in the Foundation Guidelines and CoE. May exempt others from smaller rules.`')
            .addField('O5-Y `Only The Administrator may rank users to O5-Y.`', 'Rank ID: `253` \nDescription: `Development Head. Exempt from all rules in the Foundation Guidelines and CoE for devlelopment reasons, otherwise most rules exempt. May exempt others from the Guidelines and CoE for development reasons only. May exempt others from smaller rules.`')
            .addField('O5-X `Only The Administrator may rank users to O5-X.`', 'Rank ID: `254` \nDescription: `Overseer Head. Exempt from almost all rules stated in the Foundation Guidelines and CoE. May exempt others from minor and major rules, not all though.`')
            .addField('The Administrator `Only The Administrator may rank users to The Administrator.`', 'Rank ID: `255` \nDescription: `The Administrator. Exempt from all rules stated in the Foundation Guidelines and CoE. May exempt others from all rules.`')
            .setFooter('Made by Ddogwildone1')
            .setTimestamp()

        message.channel.send(embed)
            .then((m) => m.delete({ timeout: 600000 }))

    }

}

