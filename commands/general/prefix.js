const { Command } = require('discord-akairo');

class PrefixCommand extends Command {
    constructor() {
        super('prefix', {
            aliases: ['prefix'],
            args: [
                {
                    id: 'prefix'
                }
            ],
            channel: 'guild'
        });
    }

    async exec(message, args) {

        // Fetch the stored prefix
        const prefix = this.client.settings.get(message.guild.id, 'prefix', this.client.commandHandler.prefix(message));

        // Return with the current prefix if none in arguments
        if (!args.prefix) return message.channel.send(`The prefix is currently ${prefix}`);

        // Check guild administrator permission
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You don\'t have the **\`ADMINISTRATOR\`** permission to do that.');

        // Check if similar prefix
        if (prefix === args.prefix) return message.channel.send('That is already the prefix.')

        // Update the prefix
        await this.client.settings.set(message.guild.id, 'prefix', args.prefix);

        // Return with the updated prefix
        return message.channel.send(`Successfully changed the prefix from **\`${prefix}\`** to **\`${args.prefix}\`**`);

    }
}

module.exports = PrefixCommand;