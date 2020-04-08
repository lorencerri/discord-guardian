const {
    Structures
} = require('discord.js');

Structures.extend('Guild', Guild => {
    class GuildExt extends Guild {
        constructor(...args) {
            super(...args);
        }

        get(key, fallback) {
            return this.client.db.get(`${this.id}_${key}`) || fallback;
        }

        set(key, data) {
            return this.client.db.set(`${this.id}_${key}`, data);
        }

        delete(key) {
            return this.client.db.delete(`${this.id}_${key}`);
        }

        find_entry(action, filter) {
            let guild = this;
            return new Promise((resolve) => {
                (async function search(iter) {
                    console.log(`ACTION = ${action} | ITER = ${iter}`);

                    if (!guild.me) return resolve(null);

                    if (guild.me.hasPermission('VIEW_AUDIT_LOG')) {

                        let logs = await guild.fetchAuditLogs({ limit: 10, type: action });
                        let entries = logs.entries;
                        let entry = null;

                        entries = entries.filter(filter);

                        for (var e of entries)
                            if (!entry || e[0] > entry.id) entry = e[1];

                        if (entry) return resolve(entry);

                    }

                    if (++iter === 5) return resolve(null);
                    else return setTimeout(search, 200, iter);
                })(0)
            })
        }

    }

    return GuildExt;
});