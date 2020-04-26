require('dotenv').config();

const GuardianClient = require('./core/client.js');
const client = new GuardianClient();

client.login(process.env.BOT_TOKEN);
