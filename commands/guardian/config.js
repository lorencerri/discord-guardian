const { Command } = require('discord-akairo');

// WORK IN PROGRESS

class ConfigCommand extends Command {
    constructor() {
        super('config', {
            aliases: ['config', 'settings'],
            args: [
                {
                    id: 'index',
                    type: 'integer'
                }
            ],
            channel: 'guild'
        });
    }



    async exec(message, args) {

        const embed = this.client.util.embed();
        const guild = message.guild;
        console.log('args',args)
        if (args.value) {
            if (!message.member.hasPermission('ADMINISTRATOR')) embed.setDescription('*You don\'t have the **\`ADMINISTRATOR\`** permission to do that.*');
            else {


            }
        }

        embed.setTitle(`Configuration for ${message.guild.name}`)
            .setColor(0x7289DA);

        if (!embed.description) embed.setDescription(`***\`${this.client.commandHandler.prefix(message)}limits <index> <value>\`** to update the config.*\n***\`${message.guild.prefix}reset config\`** to reset the config.*\n***\`${message.guild.prefix}limits\`** for additional options.*`);

        var index = 1;
        var limits = guild.config;
        for (var k in limits) {


            embed.addField(this.client.Utils.toProperCase(k), `${minuteText}\n${hourText}`, true);
        }

        message.channel.send(embed.addField('\u200B', '\u200B', true));

    }
}

module.exports = ConfigCommand;