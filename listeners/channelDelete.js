const { Listener } = require('discord-akairo');

module.exports = class ChannelDeleteListener extends Listener {
    constructor() {
        super('channelDelete', {
            emitter: 'client',
            event: 'channelDelete'
        });
    }

    async exec(channel) {
        let response = await this.client.handler.find_entry(channel.guild, 'CHANNEL_DELETE', (e) => e.target.id === channel.id );
        console.log(response);
    }
}