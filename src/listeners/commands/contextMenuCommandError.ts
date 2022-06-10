import type { ContextMenuCommandErrorPayload, Events } from '@sapphire/framework';
import { Listener } from '@sapphire/framework';
import { MessageEmbed } from 'discord.js';

export class ContextMenuCommandError extends Listener<typeof Events.ContextMenuCommandError> {
	public async run(error: Error, { interaction }: ContextMenuCommandErrorPayload) {
		const embed = new MessageEmbed()
			.setColor(0x6d3737)
			.setTitle('Context Menu Command Error')
			.setDescription(`**Message:**\n\`${error.message}\``);

		if (interaction.replied) return interaction.editReply({ embeds: [embed] })
		else return interaction.reply({ embeds: [embed] });
	}
}