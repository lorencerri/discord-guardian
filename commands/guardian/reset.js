const { Command } = require('discord-akairo');
const { limits } = require('../../config.js');

class LimitsCommand extends Command {
    constructor() {
        super('limits', {
            aliases: ['limits', 'limit'],
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
        const guild = message.guild;

        switch ((args.type || '').toLowerCase()) {
            case 'limits':

                break;
            default:
                message.channel.send(embed.setTitle('Unknown Type'));
        }

}

module.exports = LimitsCommand;