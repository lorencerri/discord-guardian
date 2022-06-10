import type { ContextMenuCommandDeniedPayload, Events } from '@sapphire/framework';
import { Listener, UserError } from '@sapphire/framework';
import { MessageEmbed } from 'discord.js';

export class ContextMenuCommandDenied extends Listener<typeof Events.ContextMenuCommandDenied> {
	public async run(error: UserError, { interaction }: ContextMenuCommandDeniedPayload) {
		const embed = new MessageEmbed()
			.setColor(0x6d3737)
			.setTitle('Context Menu Command Denied')
			.setDescription(`**Message:**\n\`${error.message}\``);

		return interaction.reply({ embeds: [embed] });
	}
}