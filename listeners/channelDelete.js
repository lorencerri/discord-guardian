const { Listener } = require('discord-akairo');

module.exports = class ChannelDeleteListener extends Listener {
    constructor() {
        super('channelDelete', {
            emitter: 'client',
            event: 'channelDelete'
        });
    }

    exec(member) {
        console.log(`Channel Deleted.`);
    }
}