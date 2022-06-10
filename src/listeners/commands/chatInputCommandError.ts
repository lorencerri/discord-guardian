import type { ChatInputCommandErrorPayload, Events } from '@sapphire/framework';
import { Listener } from '@sapphire/framework';
import { MessageEmbed } from 'discord.js';

export class ChatInputCommandError extends Listener<typeof Events.ChatInputCommandError> {
	public async run(error: Error, { interaction }: ChatInputCommandErrorPayload) {
		const embed = new MessageEmbed()
			.setColor(0x6d3737)
			.setTitle('Chat Input Command Error')
			.setDescription(`**Message:**\n\`${error.message}\``);

		if (interaction.replied) return interaction.editReply({ embeds: [embed] })
		else return interaction.reply({ embeds: [embed] });
	}
}