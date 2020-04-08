const { Listener } = require('discord-akairo');

module.exports = class ChannelCreateListener extends Listener {
    constructor() {
        super('channelCreate', {
            emitter: 'client',
            event: 'channelCreate'
        });
    }

    async exec(channel) {
        if (!channel.guild) return;

        // Fetch entry relating to action
        let entry = await channel.guild.find_entry('CHANNEL_CREATE', (e) => e.target.id === channel.id && e.createdTimestamp > Date.now() - 1000 * 60);
        if (!entry) return;

        // Fetch entries (w/ entry prepended)
        let entries = channel.guild.push_entry(entry, `${channel.id}`);

        // Check limits
        channel.guild.check_limits(entries, entry.executor.id, 'channel_creations');

    }
}