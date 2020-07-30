const { Command } = require('discord-akairo');

class PingCommand extends Command {
    constructor() {
        super('ping', {
            aliases: ['ping']
        });
    }

    async exec(message) {
        return message.channel.send(`Latency: **\`${this.client.ws.ping}ms\`**`);
    }
}

module.exports = PingCommand;
