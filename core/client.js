const path = require('path');
const { AkairoClient, CommandHandler, ListenerHandler } = require('discord-akairo');
const { ownerID, defaultPrefix } = require('../config.js');
const { Handler } = require('./queue/index.js');
const db = require('quick.db');

module.exports = class GuardianClient extends AkairoClient {
    constructor() {
        super({ ownerID }, { disableEveryone: true })

        this.commandHandler = new CommandHandler(this, {
            directory: path.join(__dirname, '..', 'commands/'),
            prefix: message => {
                if (message.guild) return this.db.get('prefix_' + message.guild.id) || defaultPrefix;
                return defaultPrefix;
            },
        });

        this.listenerHandler = new ListenerHandler(this, {
            directory: path.join(__dirname, '..', 'listeners/')
        });

        this.db = db;
        this.handler = new Handler(this);

    }

    async login(token) {
        this.commandHandler.loadAll();
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.listenerHandler.loadAll();
        return super.login(token);
    }
}