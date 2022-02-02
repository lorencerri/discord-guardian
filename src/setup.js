import dotenv from 'dotenv';

import { error, info, success, verifyEnv } from './helpers.js';
import prompt from 'prompt-async';

import Keyv from 'keyv';
const keyv = new Keyv('sqlite://database.sqlite');

const setup = async () => {
	info(`Initializing Setup...`);
	prompt.start();

	if (verifyEnv(dotenv.config()) !== 200) return;

	const { owner_id } = await prompt.get([{
		name: 'owner_id',
		description: 'What is your Discord User ID? (This will be used to bypass any action limits) [Optional]'
	}]);
	if (owner_id) await keyv.set('owner_id', owner_id);

	return 200;
}

const dashboard = async () => {
	// TODO

	// Assign Owner ID (Request if not found)
}

const resp = await setup();
if (resp !== 200) error('Setup failed. If you need assistance, create an issue on the GitHub repo!')
else success('Setup completed without any errors!');