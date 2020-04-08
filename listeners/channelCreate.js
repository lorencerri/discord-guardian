const { Listener } = require('discord-akairo');

module.exports = class ChannelCreateListener extends Listener {
    constructor() {
        super('channelCreate', {
            emitter: 'client',
            event: 'channelCreate'
        });
    }

    exec(channel) {
        console.log(`Channel Created.`);
    }
}