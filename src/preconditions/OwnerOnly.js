import { Precondition } from '@sapphire/framework';

class OwnerOnlyPrecondition extends Precondition {
	chatInputRun(interaction) {
		if (process.env.OWNER_ID === interaction.user.id) {
			return this.ok();
		} else {
			interaction.reply('Sorry, only the owner can run this command!');
			return this.error('Only the owner can run this command!');
		}
	}
}

export { OwnerOnlyPrecondition };