const { Command } = require('discord-akairo');
const { limits } = require('../../config.js');
const toProperCase = require('../../util/toProperCase.js');

class LimitsCommand extends Command {
    constructor() {
        super('limits', {
            aliases: ['limits', 'limit'],
            args: [
                {
                    id: 'index',
                    type: 'integer'
                },
                {
                    id: 'value',
                    type: 'integer'
                }
            ],
            channel: 'guild'
        });
    }



    async exec(message, args) {

        const embed = this.client.util.embed();
        const guild = message.guild;

        if (args.value) {
            if (!message.member.hasPermission('ADMINISTRATOR')) embed.setDescription('*You don\'t have the **\`ADMINISTRATOR\`** permission to do that.*');
            else {

                if (args.index > 10 || args.index < 1) return message.channel.send('Index is not between 1-10.');
                if (args.value > 30 || args.value < 1) return message.channel.send('Value is not between 1-30.');

                let key = Object.keys(limits)[Math.ceil(args.index / 2) - 1];
                let duration = args.index % 2 === 0 ? 'hour' : 'minute';

                guild.set(`${key}_${duration}`, args.value);
                embed.setDescription(`*${toProperCase(key)} per ${duration} has been changed to **\`${args.value}\`**.*`);

            }
        }

        embed.setTitle(`Server Limits for ${message.guild.name}`)
            .setColor(0x7289DA)
            .setFooter("If any of the defined limits are met, all of the user's roles will be automatically removed.");
        if (!embed.description) embed.setDescription(`*You can do **\`${this.client.commandHandler.prefix(message)}limits index value\`** to update the limits.*\n*You can do **\`${this.client.commandHandler.prefix(message)}reset limits\`** to reset the limits.`);

        var index = 1;
        for (var k in limits) {
            let minuteLimit = guild.get(`${k}_minute`, limits[k].per_minute);
            let hourLimit = guild.get(`${k}_hour`, limits[k].per_hour);

            let minuteText = `**${index++}.** Per Minute: **\`${minuteLimit}\`**`;
            let hourText = `**${index++}.** Per Hour: **\`${hourLimit}\`**`;

            embed.addField(toProperCase(k), `${minuteText}\n${hourText}`, true);
        }

        message.channel.send(embed.addField('\u200B', '\u200B', true));

    }
}

module.exports = LimitsCommand;