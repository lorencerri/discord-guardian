/* Preflight Checklist
 * This script is used to check if the administrator
 * has set everything up correctly.
 */

const fs = require('fs');
const Logger = require('@ayanaware/logger');
const log = Logger.get();

const preflight = () => {
	// Check existence of .env file

	if (!fs.existsSync('.env')) {
		log.warn('The .env file does not exist');
		log.warn('Creating an .env file');
		fs.writeFileSync('.env', 'BOT_TOKEN=');
		log.warn('Please fill out the required information in the .env file');
		return false;
	}

	if (!process.env.BOT_TOKEN) {
		log.error('Discord Token not found in .env file!');
		return false;
	}

	return true;
};

module.exports = { preflight };
