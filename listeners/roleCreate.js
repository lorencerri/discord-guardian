const { Listener } = require('discord-akairo');

module.exports = class RoleCreateListener extends Listener {
    constructor() {
        super('roleCreate', {
            emitter: 'client',
            event: 'roleCreate'
        });
    }

    exec(role) {
        if (!role.guild) return;

        // Fetch entry relating to action
        let entry = await role.guild.find_entry('ROLE_CREATE', (e) => e.target.id === user.id && e.createdTimestamp > Date.now() - 1000 * 60);
        if (!entry) return;

        // Fetch entries (w/ entry prepended)
        let entries = role.guild.push_entry(entry, user.tag);

        // Check limits
        role.guild.check_limits(entries, entry.executor.id, 'channel_creations');
    }
}