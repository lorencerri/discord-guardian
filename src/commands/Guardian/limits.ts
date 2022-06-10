import type { AutocompleteCommand, CommandOptions } from "@sapphire/framework";

import { ApplyOptions } from "@sapphire/decorators";
import { Command, RegisterBehavior } from '@sapphire/framework';

@ApplyOptions<CommandOptions>({
	name: 'limits',
	description: 'View or set interaction limits for the server',
	preconditions: ['OwnerOnly'],
	chatInputCommand: {
		register: true,
	},
})
export class LimitsCommand extends Command {
	async chatInputRun(_interaction: Command.ChatInputInteraction) {
		throw new Error('not implemented...');
	}

	public async autocompleteRun(...[_interaction]: Parameters<AutocompleteCommand['autocompleteRun']>) {
		throw new Error('not implemented...');
	}

	registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) => builder.setName('limits')
			.setDescription('View or set interaction limits for the server')
			.addSubcommand(subcommand => subcommand.setName('update').setDescription('Update the limit for a specific action')
				.addStringOption(option => //
					option.setName('action').setDescription('The name of the action to update').setRequired(true).setAutocomplete(true))
				.addStringOption(option => //
					option.setName('limit').setDescription('The new amount of times this action can be performed in a minute').setRequired(true).setAutocomplete(true)))
			.addSubcommand(subcommand => subcommand.setName('view').setDescription('Returns all of the current limits')),
			{ behaviorWhenNotIdentical: RegisterBehavior.Overwrite }
		);
	}
}