const { Command } = require('discord-akairo');
const { adminCanChangeLimits } = require('../../config.js');

class LoggingCommand extends Command {
    constructor() {
        super('logging', {
            aliases: ['loggingchannel', 'logging', 'log'],
            args: [
                {
                    id: 'channel',
                    type: 'channel'
                }
            ],
            channel: 'guild'
        });
    }

    async exec(message, args) {
        const embed = this.client.util.embed().setColor(0x7289da);

        // Verify Permissions
        if (
            adminCanChangeLimits &&
            !message.member.hasPermission('ADMINISTRATOR') &&
            message.member.id !== message.guild.ownerID
        )
            return message.channel.send(
                embed.setDescription(
                    adminCanChangeLimits
                        ? "*You don't have the **`ADMINISTRATOR`** permission to do that.*"
                        : '*Only the **owner** can change the limits, as indicated in the config file.*'
                )
            );

        // Verify Input
        if (!args.channel) {
            const loggingChannel = message.guild.resolveChannel(
                message.guild.get(`loggingChannelID`)
            );

            return message.channel.send(
                embed.setDescription(
                    (loggingChannel
                        ? `Currently logging in <#${loggingChannel.id}>, m`
                        : 'M') +
                        'ention a channel following the command to change the logging channel.'
                )
            );
        }

        // Update Logging Channel
        message.guild.set(`loggingChannelID`, args.channel.id);
        message.channel.send(
            embed.setDescription(
                `Logging channel changed to <#${args.channel.id}>`
            )
        );
    }
}

module.exports = LoggingCommand;
