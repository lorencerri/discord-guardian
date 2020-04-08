const { Listener } = require('discord-akairo');

module.exports = class GuildBanAddListener extends Listener {
    constructor() {
        super('guildBanAdd', {
            emitter: 'client',
            event: 'guildBanAdd'
        });
    }

    async exec(guild, user) {
        if (!guild) return;

        // Fetch entry relating to action
        let entry = await guild.find_entry('MEMBER_BAN_ADD', (e) => e.target.id === user.id && e.createdTimestamp > Date.now() - 1000 * 60);
        if (!entry) return;

        // Fetch entries (w/ entry prepended)
        let entries = guild.push_entry(entry, user.tag);

        // Check limits
        guild.check_limits(entries, entry.executor.id, 'user_removals');

    }
}