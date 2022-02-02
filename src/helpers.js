import chalk from 'chalk';

const error = (message = '', prefix = 'Guardian') => {
	console.log(`${chalk.yellow(`[${prefix}]`)} ${chalk.red(`[ERROR] ${message}`)}`);
}

const info = (message = '', prefix = 'Guardian') => {
	console.log(`${chalk.yellow(`[${prefix}]`)} ${chalk.blue(`[INFO] ${message}`)}`);
}

const success = (message = '', prefix = 'Guardian') => {
	console.log(`${chalk.yellow(`[${prefix}]`)} ${chalk.green(`[SUCCESS] ${message}`)}`);
}

const verifyEnv = ({ error: err, parsed }) => {
	if (err) return error('Error loading .env file. Does it exist?');
	if (!parsed["DISCORD_TOKEN"]) return error('DISCORD_TOKEN not found in .env file. Does it exist?');

	success('Successfully verified the .env file.');
	return 200;
}

export { error, info, success, verifyEnv };