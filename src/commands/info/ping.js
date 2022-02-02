import { MessageEmbed } from 'discord.js';
import { Command, RegisterBehavior } from '@sapphire/framework';

class PingCommand extends Command {
	constructor(ctx, options) {
		super(ctx, {
			...options,
			name: 'ping',
			description: 'Returns the ping and latency for Guardian.',
			chatInputCommand: {
				register: true,
				behaviorWhenNotIdentical: RegisterBehavior.Overwrite
			}
		})
	}

	async chatInputRun(interaction) {
		const embed = new MessageEmbed()
			.setColor(0xfee75c)
			.setDescription('**Ping?** Please wait...');

		const message = await interaction.reply({
			embeds: [embed],
			fetchReply: true
		});

		const ping = interaction.client.ws.ping;
		const latency = message.createdTimestamp - Date.now();

		embed.setColor(0x57f287).setDescription(`⏱️ Ping: ${ping}ms\n⌛ Latency: ${latency}ms`);

		await interaction.editReply({ embeds: [embed] });
	}
}

export { PingCommand };