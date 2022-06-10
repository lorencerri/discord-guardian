import { ApplyOptions } from '@sapphire/decorators';
import { Command, CommandOptions, RegisterBehavior } from '@sapphire/framework';
import { Type } from '@sapphire/type';
import { codeBlock, isThenable } from '@sapphire/utilities';
import { MessageEmbed } from 'discord.js';
import { inspect } from 'util';

@ApplyOptions<CommandOptions>({
	aliases: ['ev'],
	description: 'Evaluates any JavaScript code',
	preconditions: ['OwnerOnly'],
	chatInputCommand: {
		register: true,
	},
})
export class EvalCommand extends Command {
	async clean(token = '', text = '') {
		if (text.constructor.name == 'Promise') text = await text;
		if (typeof text !== 'string')
			text = require('util').inspect(text, {
				depth: 1
			});
		return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203)).replace(token, '<TOKEN>');
	}

	private async eval(interaction: Command.ChatInputInteraction, code: string, flags: { depth: number; showHidden: boolean }) {

		let success = true;
		let result = null;

		try {
			// eslint-disable-next-line no-eval
			result = await eval(code);
			result = this.clean(interaction?.client?.token || '', result);
		} catch (error) {
			if (error && error instanceof Error && error.stack) {
				this.container.client.logger.error(error);
			}
			result = error;
			success = false;
		}

		const type = new Type(result).toString();
		if (isThenable(result)) result = await result;

		if (typeof result !== 'string') {
			result = inspect(result, {
				depth: flags.depth,
				showHidden: flags.showHidden
			});
		}

		return { result, success, type };
	}

	async chatInputRun(interaction: Command.ChatInputInteraction) {
		const code = interaction.options.get('code', true).value || '';
		const depth = interaction.options.get('depth')?.value || 2;
		const symbols = interaction.options.get('symbols')?.value || false;
		const silent = interaction.options.get('silent')?.value || false;

		if (typeof code !== 'string') throw new Error('code is not a string');
		if (typeof depth !== 'number') throw new Error('depth is not a number');
		if (typeof symbols !== 'boolean') throw new Error('showHidden is not a boolean')
		if (typeof silent !== 'boolean') throw new Error('silent is not a boolean')

		const { result, success, type } = await this.eval(interaction, code, { depth, showHidden: symbols });

		if (silent) return null;

		const embed = new MessageEmbed();

		if (success) embed.setColor(0x6d8d4e).setTitle('Success').setDescription(codeBlock('typescript', result));
		else embed.setColor(0x6d3737).setTitle('Error').setDescription(codeBlock('js', result));
		embed.addField('Type', `**\`${type}\`**`)

		if ((embed?.description?.length || 0) > 2000) {
			return interaction.reply({
				content: `Output was too long... sent the result as a file.`,
				files: [{ attachment: Buffer.from(result), name: 'output.js' }]
			});
		}

		return interaction.reply({ embeds: [embed] });
	}

	registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) =>
			builder
				.setName('eval')
				.setDescription('Evaluates any JavaScript code')
				.addStringOption((option) => option.setName('code').setDescription('The input to evaluate').setRequired(true))
				.addIntegerOption((option) => option.setName('depth').setDescription('The amount of times to recurse when formatting the output'))
				.addBooleanOption((option) => option.setName('symbols').setDescription('Whether or not to include non-enumerable symbols in the output'))
				.addBooleanOption((option) => option.setName('silent').setDescription('Whether or not to display an output')),
			{ behaviorWhenNotIdentical: RegisterBehavior.Overwrite }
		);
	}
}
