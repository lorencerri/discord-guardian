require('dotenv').config();

const Logger = require('@ayanaware/logger');
const fs = require('fs');

const log = Logger.get();

// Preflight Checklist
log.info('Starting preflight checklist...');

if (!fs.existsSync('.env')) {
	log.warn('The .env file does not exist');
	log.warn('Creating an .env file');
	fs.writeFileSync('.env', 'BOT_TOKEN=');
	log.warn('Please fill out the required information in the .env file');
	return log.warn('Exiting...');
}

if (!process.env.BOT_TOKEN)
	return log.error('Discord Token not found in .env file!');
