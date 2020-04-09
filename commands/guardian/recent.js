const { Command } = require('discord-akairo');
const { limits } = require('../../config.js');

class RecentCommand extends Command {
    constructor() {
        super('recent', {
            aliases: ['recent'],
            channel: 'guild'
        });
    }



    async exec(message, args) {

        const embed = this.client.util.embed()
            .setColor(0x7289DA)
            .setTitle(`Recent Actions in ${message.guild.name}`);

        let actions = message.guild.getActions();
        for (var k in actions) embed.addField(actions[k].name, actions[k].actions);
  
        message.channel.send(embed);

    }

}

module.exports = RecentCommand;