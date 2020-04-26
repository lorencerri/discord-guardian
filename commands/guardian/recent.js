const { Command } = require('discord-akairo');

class RecentCommand extends Command {
    constructor() {
        super('recent', {
            aliases: ['recent'],
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
            .setTitle(`Recent Actions in ${message.guild.name}`)
            .setDescription(
                `*You can do **\`${message.guild.prefix}recent <ID>\`** to view all actions relating to a user.*`
            );

        let actions = message.guild.getActions(
            10,
            args.ID
                ? i =>
                      i.executor.id === args.ID ||
                      (i.target && i.target.id === args.ID)
                : undefined
        );
        for (var k in actions)
            embed.addField(
                `${actions[k].name} (${
                    (actions[k].actions || '').split('\n').length - 1
                })`,
                actions[k].actions || 'No entries.'
            );

        message.channel.send(embed);
    }
}

module.exports = RecentCommand;
