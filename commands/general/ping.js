const { Command } = require('discord-akairo');

class PingCommand extends Command {
    constructor() {
        super('ping', {
            aliases: ['ping']
        });
    }

    async exec(message) {
        const sent = await message.channel.send('Calculating...');
        return sent.edit(
            `Latency: **\`${
                sent.createdTimestamp - message.createdTimestamp
            }ms\`**`
        );
    }
}

module.exports = PingCommand;
