import colors from 'colorette';
import { MessageEmbed } from 'discord.js';
import { Command, RegisterBehavior } from '@sapphire/framework';

class InfoCommand extends Command {
	constructor(context, options) {
		super(context, {
			...options,
			name: 'info',
			description: 'Returns bot information and statistics',
			chatInputCommand: {
				register: true,
				behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
				guildIds: [process.env.GUILD_ID]
			}
		});
	}

	async chatInputRun(interaction) {
		const stats = [
			`**\`${interaction.client.guilds.cache
				.reduce((c, v) => c + v.memberCount, 0)
				.toString()
				.padEnd(3, ' ')}\`** users`,
			`**\`${interaction.client.guilds.cache.size
				.toString()
				.padEnd(3, ' ')}\`** guilds`
		];

		const stores = [...this.container.client.stores.values()]
			.sort((a, b) => b.size - a.size)
			.map(
				store =>
					`**\`${store.size.toString().padEnd(3, ' ')}\`** ${store.name
					}`
			);

		const embed = new MessageEmbed()
			.setColor(0xfee75c)
			.setTitle('Information')
			.addField('Stats', stats.join('\n'))
			.addField('Stores', stores.join('\n'));

		interaction.reply({ embeds: [embed] });
	}
}

export { InfoCommand };