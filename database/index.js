const { database } = require('../config.js');
const Sequelize = require('sequelize');

const connection = new Sequelize(database.name, database.username, process.env.POSTGRES_PASSWORD, database.options);

module.exports = connection;

module.exports.init = async () => {
    try {
        await connection.authenticate();
        console.log('[Database] Connected.');
    } catch (e) {
        console.log('[Database] Failed to connect.', e);
        process.exit();
    }
}