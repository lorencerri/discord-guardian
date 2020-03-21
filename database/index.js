const { database } = require('../config.js');
const { SequelizeProvider } = require('discord-akairo');
const Sequelize = require('sequelize');

const connection = new Sequelize(database.name, database.username, process.env.POSTGRES_PASSWORD, database.options);

module.exports = connection;

module.exports.init = async client => {
    try {
        await connection.authenticate();
        connection.models = require('./models/index.js');
        client.settings = new SequelizeProvider(connection.models.guilds, {
            idColumn: 'guild_id',
            dataColumn: 'settings'
        });
        console.log('[Database] Connected.');
    } catch (e) {
        console.log('[Database] Failed to connect.', e);
        process.exit()
    }
}