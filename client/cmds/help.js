const { MessageEmbed } = require('discord.js');
const SERVERS = require('@Database/servers');

const Images = require('@Images/index');
const Colors = require('@Colors/index');
const Embeds = require('@Embeds/index');

module.exports.run = async (client, message, args, params) => {

    let prefix = 'tox.'

    await SERVERS.findOne({
        guildID: message.guild.id
    }, (err, res) => {

        if (!res) {
            prefix = 'tox.'
        } else {
            prefix = res.prefix
        }

        if (args[0] && client.commands.has(args[0])) {

            const cmd = client.commands.get(args[0]);

            let cmdname = cmd.help.name.charAt(0).toUpperCase() + cmd.help.name.slice(1);

            let aliases = 'No Aliases available for the Provided Command.';

            if (cmd.help.aliases.length === 0) {

                aliases = 'No Aliases available for the Provided Command';

            } else {

                aliases = cmd.help.aliases.join('\n');
            }

            const embed = new MessageEmbed()
              .setTitle('ToxMod | Command Help')
              .setColor(Colors.Primary)
              .setDescription(`${cmd.help.description}`)
              .addField('Prefix', `${prefix}`, true)
              .addField('Category', `${cmd.help.category}`, true)
              .addField('Examples', `${cmd.help.example}`, true)
              .addField('Aliases', "``" + aliases + "``", true)
              .setFooter('Usage Syntax: <> = Required, [] = Optional', '');

              return message.channel.send(embed);
        }

        let info_cmds = client.commands.filter(cmd => cmd.help.category == 'info');
        let mod_cmds = client.commands.filter(cmd => cmd.help.category == 'mod');
        let owner_cmds = client.commands.filter(cmd => cmd.help.category == 'owner');

        const embed2 = new MessageEmbed()
          embed2.setTitle('Tox Mod Help')
          embed2.setColor(Colors.Primary)
          embed2.setDescription("**Default Prefix: **" + "``" + prefix + "``")
          embed2.setThumbnail(Images.Animated)
          embed2.addField('Command Help', `${prefix}help [CommandName]`, true)
          embed2.addField('Info Commands', info_cmds.map(cmd => "``" + cmd.help.name + "``" ).join("** , **"), true)
          embed2.addField('Mod Commands', mod_cmds.map(cmd => "``" + cmd.help.name + "``" ).join("** , **"), true)

          if (client.config.owners.includes(message.author.id)) {

            embed2.addField('Owner Commands', owner_cmds.map(cmd => "``" + cmd.help.name + "``" ).join("** , **"), true)

          }

          embed2.setFooter(Embeds.Footer, Images.Animated)
    })
}

module.exports.help = {
    name: 'help',
    category: 'info',
    aliases: ['cmds', 'commands', 'h', 'helpme'],
    description: 'Sends a list of Available Commands',
    example: '``help <CommandName>``'
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: ['SEND_MESSAGES', 'EMBED_LINKS'],
    ownerOnly: false,
    betaMode: false,
    devLock: false
}

module.exports.limits = {
    rateLimit: 2,
    cooldown: 1e4
}