import type { AutocompleteCommand, CommandOptions } from "@sapphire/framework";
import { ApplicationCommandOptionChoiceData, MessageEmbed } from "discord.js";

import { ApplyOptions } from "@sapphire/decorators";
import { Command, RegisterBehavior } from '@sapphire/framework';
import { Stopwatch } from "@sapphire/stopwatch";

@ApplyOptions<CommandOptions>({
	name: 'reload',
	description: 'Reloads a piece or store',
	preconditions: ['OwnerOnly'],
	chatInputCommand: {
		register: true,
	},
})
export class ReloadCommand extends Command {
	async chatInputRun(interaction: Command.ChatInputInteraction) {
		const type = interaction.options.getSubcommand(true);
		const name = interaction.options.get('name')?.value || '';
		const timer = new Stopwatch().stop();

		if (typeof name !== 'string') throw new Error("name is not a string");

		const embed = new MessageEmbed()
			.setColor(0xb18652)
			.setDescription(
				`Reloading ${type !== 'all'
					? `**\`${type}: ${name}\`**`
					: 'all pieces and stores'
				}, please wait...`
			);

		await interaction.reply({
			embeds: [embed],
			fetchReply: true
		});

		const stores = this.container.stores;
		timer.start();

		if (type === 'piece') {
			let match;
			for (const [_, store] of stores) {
				for (const [_, piece] of store) {
					if (piece.name === name) {
						match = piece;
						break;
					}
				}
			}
			match?.reload();
			embed.setDescription(`Successfully reloaded **\`${name}\`** piece!`)
		} else if (type === 'store') {
			const store = stores.find(store => store.name === name);
			if (!store) throw new Error(`store:${name} could not be found`)
			await store.loadAll();
			embed.setDescription(`Successfully reloaded **\`${name}\`** store!`)
		} else {
			await Promise.all(stores.map(store => store.loadAll()));
			embed.setDescription(`Successfully reloaded all **\`${stores.size}\`** stores!`);
		}

		embed.setFooter({ text: `Duration: ${timer.stop().toString()}` }).setColor(0x6d8d4e);
		await interaction.editReply({ embeds: [embed] });
	}

	public async autocompleteRun(...[interaction]: Parameters<AutocompleteCommand['autocompleteRun']>) {
		const type = interaction.options.getSubcommand(true);
		const query = (String(interaction.options.getFocused()) || "").trim();

		let stores = this.container.stores;
		let values: ApplicationCommandOptionChoiceData[] = [];

		if (type === 'store') {
			for (const [_, store] of stores) {
				const name = store.name;
				if (query && !name.includes(query)) continue;
				values.push({ name: store.name, value: store.name })
			}
		} else if (type === 'piece') {
			for (const [_, store] of stores) {
				for (const [_, piece] of store) {
					const name = piece.name;
					if (piece.location.full.includes('node_modules')) continue;
					if (query && !name.includes(query)) continue;
					values.push({ name: piece.name, value: piece.name })
				}
			}
		}

		return interaction.respond(values);
	}

	registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) => builder.setName('reload')
			.setDescription('Reloads a piece or store')
			.addSubcommand(subcommand => subcommand.setName('piece').setDescription('Reload a piece of code')
				.addStringOption(option => //
					option.setName('name').setDescription('The name of the piece to reload').setRequired(true).setAutocomplete(true)))
			.addSubcommand(subcommand => subcommand.setName('store').setDescription('Reload a store')
				.addStringOption(option => //
					option.setName('name').setDescription('The name of the store to reload').setRequired(true).setAutocomplete(true)))
			.addSubcommand(subcommand => subcommand.setName('all').setDescription('Reload all pieces and stores')),
			{ behaviorWhenNotIdentical: RegisterBehavior.Overwrite }
		);
	}
}