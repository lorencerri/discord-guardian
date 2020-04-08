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

    }
    return GuildExt;
});