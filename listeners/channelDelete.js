const { Listener } = require('discord-akairo');

module.exports = class ChannelDeleteListener extends Listener {
    constructor() {
        super('channelDelete', {
            emitter: 'client',
            event: 'channelDelete'
        });
    }

    exec(channel) {
        this.client.queue.publish('audit-log', [this.client, 'channelDelete', channel.id, channel.guild.id]);
    }
}