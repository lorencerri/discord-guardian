import dotenv from 'dotenv';
const { parsed, error: envError } = dotenv.config();

import chalk from 'chalk';
import prompt from 'prompt-async';

import Keyv from 'keyv';
const keyv = new Keyv('sqlite://database.sqlite');

const error = (message = '') => {
	console.log(`${chalk.yellow(`[Setup]`)} ${chalk.red(`[ERROR] ${message}`)}`);
}

const info = (message = '') => {
	console.log(`${chalk.yellow(`[Setup]`)} ${chalk.blue(`[INFO] ${message}`)}`);
}

const setup = async () => {
	info(`Initializing Setup...`);
	prompt.start();

	if (envError) return error('Error loading .env file. Does it exist?');
	if (!parsed["DISCORD_TOKEN"]) return error('DISCORD_TOKEN not found in .env file. Does it exist?');

	const { owner_id } = await prompt.get([{
		name: 'owner_id',
		description: 'What is your Discord User ID? (This will be used to bypass any action limits) [Optional]'
	}]);
	if (owner_id) await keyv.set('owner_id', owner_id);

	return 200;
}

const resp = await setup();
if (resp !== 200) error('Setup failed. If you need assistance, create an issue on the GitHub repo!')
else info('Setup completed without any errors!');