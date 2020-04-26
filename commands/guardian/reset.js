const { Command } = require('discord-akairo');
const { limits } = require('../../config.js');

class ResetCommand extends Command {
    constructor() {
        super('reset', {
            aliases: ['reset'],
            args: [
                {
                    id: 'type'
                }
            ],
            channel: 'guild'
        });
    }

    async exec(message, args) {
        if (!message.member.hasPermission('ADMINISTRATOR'))
            message.channel.send('***Sorry**, invalid permissions.*');

        switch ((args.type || '').toLowerCase()) {
            case 'limits':
                message.guild.delete('limits');
                message.channel.send('Guild limits have been reset.');
                break;
            default:
                message.channel.send(
                    `***Unknown type**, the following types are available: **\`limits\`***\n**\`Usage: ${message.guild.prefix}reset <type>\`**`
                );
        }
    }
}

module.exports = ResetCommand;
