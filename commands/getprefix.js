const { Command } = require('discord-akairo');
const { prefix } = require('../config.js');

// Temporary file, testing database

class GetPrefixCommand extends Command {
    constructor() {
        super('getprefix', {
            aliases: ['getprefix']
        });
    }

    async exec(message, args) {
        message.channel.send(`The prefix is currently ${this.client.settings.get(message.guild.id, 'prefix', prefix)}`);
    }
}

module.exports = GetPrefixCommand;