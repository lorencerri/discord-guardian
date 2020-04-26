const { Command } = require('discord-akairo');

class StatsCommand extends Command {
    constructor() {
        super('stats', {
            aliases: ['stats'],
            args: [
                {
                    id: 'ID'
                }
            ],
            channel: 'guild'
        });
    }

    async exec(message, args) {
        const embed = this.client.util
            .embed()
            .setColor(0x7289da)
            .setTitle(`Statistics for ${message.guild.name}`);

        let actions = message.guild.getActions(
            10000,
            args.ID
                ? i =>
                      i.executor.id === args.ID ||
                      (i.target && i.target.id === args.ID)
                : undefined
        );

        let description = '';

        for (var k in actions)
            description += `**${actions[k].name}: \`${
                (actions[k].actions || '').split('\n').length - 1
            }\`**\n`;

        message.channel.send(
            embed.setDescription(
                `*You can do **\`${message.guild.prefix}stats <ID>\`** to view all stats relating to a user.*\n\n${description}`
            )
        );
    }
}

module.exports = StatsCommand;
