const { Command } = require('discord-akairo');
const { prefix } = require('../config.js');

// Temporary file, testing database

class SetPrefixCommand extends Command {
    constructor() {
        super('setprefix', {
            aliases: ['setprefix'],
            args: [
                {
                    id: 'prefix',
                    default: prefix
                }
            ],
            channel: 'guild'
        });
    }

    async exec(message, args) {
        if (message.author.id !== this.client.ownerID) return message.channel.send('You don\'t have permissions to do that.');

        const oldPrefix = this.client.settings.get(message.guild.id, 'prefix', prefix);

        await this.client.settings.set(message.guild.id, 'prefix', args.prefix);
        return message.send(`Successfully changed prefix from ${oldPrefix} to ${args.prefix}`);
    }
}

module.exports = SetPrefixCommand;