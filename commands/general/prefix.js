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
        const prefix = message.guild.prefix;

        // Return with the current prefix if none in arguments
        if (!args.prefix)
            return message.channel.send(
                `*The prefix is currently **\`${prefix}\`***\n*You can change it by doing **\`${prefix}prefix <prefix>\`***`
            );

        // Check guild administrator permission
        if (!message.member.hasPermission('ADMINISTRATOR'))
            return message.channel.send('***Sorry**, invalid permissions.*');

        // Check if similar prefix
        if (prefix === args.prefix)
            return message.channel.send(
                '***Sorry**, that is already the prefix.*'
            );

        // Update the prefix
        message.guild.set(`prefix`, args.prefix);

        // Return with the updated prefix
        return message.channel.send(
            `*Successfully changed the prefix from **\`${prefix}\`** to **\`${args.prefix}\`***`
        );
    }
}

module.exports = PrefixCommand;
