import '@sapphire/plugin-logger/register';

import { error, success, verifyEnv } from './helpers.js';
import { GatewayIntentBits } from 'discord-api-types/v9'
import { SapphireClient, container } from '@sapphire/framework'
import { Constants } from 'discord.js'
import dotenv from 'dotenv';
import Keyv from 'keyv';

const init = async () => {

	const env = dotenv.config();
	if (verifyEnv(env) !== 200) return;

	const client = new SapphireClient({
		loadMessageCommandListeners: true,
		enableLoaderTraceLoggings: true,
		intents: GatewayIntentBits.Guilds,
		partials: [Constants.PartialTypes.CHANNEL],
		disableMentions: 'everyone'
	});

	try {
		await client.login(env.parsed["DISCORD_TOKEN"]);
		success('Successfully Logged In');
	} catch (e) {
		error(e.message);
		client.destroy();
		process.exit(1);
	}

	container.keyv = new Keyv('sqlite://database.sqlite');

}

init();