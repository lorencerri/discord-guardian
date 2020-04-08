const {
    Structures
} = require('discord.js');

Structures.extend('Guild', Guild => {
    class GuildExt extends Guild {
        constructor(...args) {
            super(...args);
        }

        get(key, fallback) {
            return this.client.db.get(`${key}_${this.id}`) || fallback;
        }

        set(key, data) {
            return this.client.db.set(`${key}_${this.id}`, data);
        }

    }
    return GuildExt;
});