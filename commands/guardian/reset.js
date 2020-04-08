const { Command } = require('discord-akairo');
const { limits } = require('../../config.js');

class LimitsCommand extends Command {
    constructor() {
        super('reset', {
            aliases: ['reset'],
            args: [
                {
                    id: 'type',
                },
            ],
            channel: 'guild'
        });
    }



    async exec(message, args) {

        const embed = this.client.util.embed();

        if (!message.member.hasPermission('ADMINISTRATOR')) message.channel.send(embed.setTitle('Invalid Permissions'));

        switch ((args.type || '').toLowerCase()) {
            case 'limits':
                message.guild.delete('limits');
                message.channel.send('Guild limits have been reset.');
                break;
            default:
                message.channel.send(embed.setTitle('Unknown Type'));
        }

    }

}

module.exports = LimitsCommand;