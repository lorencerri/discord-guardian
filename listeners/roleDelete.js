const { Listener } = require('discord-akairo');

module.exports = class RoleDeleteListener extends Listener {
    constructor() {
        super('roleDelete', {
            emitter: 'client',
            event: 'roleDelete'
        });
    }

    async exec(role) {
        if (!role.guild) return;

        // Fetch entry relating to action
        let entry = await role.guild.find_entry('ROLE_DELETE', (e) => e.target.id === role.id && e.createdTimestamp > Date.now() - 1000 * 60);
        if (!entry) return;

        // Fetch entries (w/ entry prepended)
        let entries = role.guild.push_entry(entry, role.name);

        // Check limits
        role.guild.check_limits(entries, entry.executor.id, 'role_deletions');
    }
}