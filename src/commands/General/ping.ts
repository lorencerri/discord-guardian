import { ApplyOptions } from '@sapphire/decorators';
import {
	Command,
	CommandOptions,
	RegisterBehavior,
} from '@sapphire/framework';
import { isMessageInstance } from '@sapphire/discord.js-utilities';
import { ApplicationCommandType } from 'discord-api-types/v10';
import { MessageEmbed } from 'discord.js';

@ApplyOptions<CommandOptions>({
	name: 'ping',
	description: 'Ping bot to see if it is alive.',
	chatInputCommand: {
		register: true,
		idHints: ['984583457768353835']
	},
})
export class PingCommand extends Command {
	async ping(interaction: Command.ChatInputInteraction | Command.ContextMenuInteraction) {

		const embed = new MessageEmbed()
			.setTitle("Ping?")
			.setDescription("`Please wait...`");

		const msg = await interaction.reply({ embeds: [embed], ephemeral: true, fetchReply: true });

		if (!isMessageInstance(msg)) throw new Error("Failed to send message.");

		const diff = msg.createdTimestamp - interaction.createdTimestamp;
		const ping = Math.round(this.container.client.ws.ping);

		embed.setTitle('Pong!').setDescription(`Round trip took: ${diff}ms. Heartbeat: ${ping}ms`)
		return interaction.editReply({ embeds: [embed] });
	}

	chatInputRun(interaction: Command.ChatInputInteraction) {
		return this.ping(interaction);
	}

	contextMenuRun(interaction: Command.ContextMenuInteraction) {
		return this.ping(interaction);
	}

	registerApplicationCommands(registry: Command.Registry) {
		registry.registerContextMenuCommand((builder) => builder.setName('ping').setType(ApplicationCommandType.Message),
			{ behaviorWhenNotIdentical: RegisterBehavior.Overwrite });

		registry.registerChatInputCommand((builder) => builder.setName('ping').setDescription("Ping bot to see if it is alive."),
			{ behaviorWhenNotIdentical: RegisterBehavior.Overwrite });
	}
}
