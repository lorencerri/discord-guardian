class Handler {
    constructor(client) {
        this.client = client;
        this.queue = [];
    }

    find_entry(guild, action, filter) {
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

                    if (entries.size >= 1) return resolve(entry);

                }

                if (++iter === 5) return resolve(null);
                else return setTimeout(search, 200, iter);
            })(0)
        })
    }

}

module.exports = { Handler };