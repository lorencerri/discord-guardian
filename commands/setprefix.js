const { Command } = require('discord-akairo');

// Temporary file, testing database

class SetPrefixCommand extends Command {
    constructor() {
        super('setprefix', {
            aliases: ['setprefix'],
            args: [
                {
                    id: 'prefix',
                    default: 'g!'
                }
            ],
            channel: 'guild'
        });
    }

    async exec(message, args) {
        if (message.author.id !== this.client.ownerID) return message.channel.send('You don\'t have permissions to do that.');

        const oldPrefix = this.client.settings.get(message.guild.id, 'prefix', 'g!');

        await this.client.settings.set(message.guild.id, 'prefix', args.prefix);
        return message.send(`Successfully changed prefix from ${oldPrefix} to ${args.prefix}`);
    }
}

module.exports = SetPrefixCommand;