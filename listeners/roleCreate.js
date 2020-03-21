const { Listener } = require('discord-akairo');

module.exports = class RoleCreateListener extends Listener {
    constructor() {
        super('roleCreate', {
            emitter: 'client',
            event: 'roleCreate'
        });
    }

    exec(role) {
        console.log(`Role Created.`);
    }
}