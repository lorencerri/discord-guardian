const { Listener } = require('discord-akairo');

module.exports = class GuildBanAddListener extends Listener {
    constructor() {
        super('guildBanAdd', {
            emitter: 'client',
            event: 'guildBanAdd'
        });
    }

    exec(guild) {
        console.log(`Member Banned.`);
    }
}