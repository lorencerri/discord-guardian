import { Command, RegisterBehavior } from '@sapphire/framework';
import paster from 'paster.js';

class EvalCommand extends Command {
	constructor(context, options) {
		super(context, {
			...options,
			name: 'eval',
			description: 'Evaluates JavaScript code',
			preconditions: ['OwnerOnly']
		});
	}

	async clean(token, text) {
		if (text && text.constructor.name == 'Promise') text = await text;
		if (typeof text !== 'string')
			text = require('util').inspect(text, {
				depth: 1
			});

		text = text
			.replace(/`/g, '`' + String.fromCharCode(8203))
			.replace(/@/g, '@' + String.fromCharCode(8203))
			.replace(token, '<TOKEN>');

		return text;
	}

	async chatInputRun(interaction) {
		const code = interaction.options.getString('code', true);
		try {
			const evaled = await eval(code);
			const clean = await this.clean(interaction.client.token, evaled);
			if (clean.length > 800) {
				const paste = await paster.create(clean);
				interaction.reply(paste.link);
			} else interaction.reply(`\`\`\`js\n${clean}\n\`\`\``);
		} catch (err) {
			interaction.reply(
				`\`ERROR\` \`\`\`xl\n${await this.clean(
					this.client,
					err
				)}\n\`\`\``
			);
		}
	}

	registerApplicationCommands(registry) {
		registry.registerChatInputCommand(
			{
				name: this.name,
				description: this.description,
				options: [
					{
						name: 'code',
						description: 'The code to evaluate',
						type: 'STRING',
						required: true
					}
				]
			},
			{
				behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
				guildIds: [process.env.GUILD_ID]
			}
		);
	}
}

export { EvalCommand };