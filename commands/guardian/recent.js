const { Command } = require('discord-akairo');
const { limits } = require('../../config.js');

class RecentCommand extends Command {
    constructor() {
        super('recent', {
            aliases: ['recent'],
            args: [
                {
                    id: 'ID',
                }
            ],
            channel: 'guild'
        });
    }



    async exec(message, args) {

        let lines = [`*You can do **\`${this.client.commandHandler.prefix(message)}recent <ID>\`** to view all actions relating to a user.*`]

        const embed = this.client.util.embed()
            .setColor(0x7289DA)
            .setTitle(`Recent Actions in ${message.guild.name}`)
            .setDescription(lines.join('\n'));

        let actions = message.guild.getActions(args.ID ? (i => i.executor.id === args.ID || (i.target && (i.target.id === args.ID))) : undefined);
        for (var k in actions) embed.addField(`${actions[k].name} (${(actions[k].actions || '').split('\n').length - 1})`, actions[k].actions || 'No entries.');
  
        message.channel.send(embed);

    }

}

module.exports = RecentCommand;