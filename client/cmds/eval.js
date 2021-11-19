const { MessageEmbed } = require('discord.js');
const CASES = require('@Database/cases');
const SERVERS = require('@Database/servers');

const Images = require('@Images/index');
const Colors = require('@Colors/index');
const Embeds = require('@Embeds/index');

module.exports.run = async (client, message, args, params) => {

     let toEval = args.join(" ")

        if (!toEval) {

            let EvalErrorEmbed = new MessageEmbed()
              .setTitle('Error | Noting to Eval')
              .setColor(Colors.Error)
              .setDescription('I cant evaluate the `Air` noob! Gimme something to Eval.')
              .setTimestamp()
              .setFooter(Embeds.Footer, Images.Animated)

            return message.channel.send(EvalErrorEmbed)

        } else {

            let hrStart = process.hrtime()

            let hrDiff;

            let evaluated = inspect(eval(toEval, { depth: 0 }));

            hrDiff = process.hrtime(hrStart);

            let SuccessEmbed = new MessageEmbed()
              .setTitle('Javascript Evaluation')
              .setColor(Colors.Primary)
              .setDescription(`Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms`)
              .setTimestamp()
              .addField('Results', `${evaluated}`, true)
              .setFooter(Embeds.Footer, Images.Animated)

            return message.channel.send(SuccessEmbed);
    }
}

module.exports.help = {
    name: 'eval',
    category: 'owner',
    aliases: ['run', 'code'],
    description: 'Evaluate some Javascript',
    example: '``eval <code>``'
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: ['EMBED_LINKS', 'SEND_MESSAGES'],
    ownerOnly: true,
    betaMode: false,
    devLock: false
}

module.exports.limits = {
    rateLimit: 2,
    cooldown: 1e4
}
