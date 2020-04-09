const { Listener } = require('discord-akairo');

module.exports = class GuildMemberRemoveListener extends Listener {
    constructor() {
        super('guildMemberRemove', {
            emitter: 'client',
            event: 'guildMemberRemove'
        });
    }

    async exec(member) {
        if (!member.guild) return;

        // Fetch entry relating to action
        let entry = await member.guild.find_entry('MEMBER_KICK', (e) => e.target.id === member.id && e.createdTimestamp > Date.now() - 1000 * 60);
        if (!entry) return;

        // Fetch entries (w/ entry prepended)
        let entries = member.guild.push_entry(entry, member.user.tag);

        // Check limits
        member.guild.check_limits(entries, entry.executor.id, 'user_removals');

    }
}