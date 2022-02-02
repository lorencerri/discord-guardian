## Guardian

Guardian allows server owners to set strict limits on administration actions. These actions include: bans, kicks, channel creations/deletions, and role creations/deletions. Once someone meets any of these limits, their Discord permissions are automatically revoked via removing all of their roles.

## Suggesting Features

Please suggest features via the [issues](https://github.com/lorencerri/discord-guardian) page. Alternatively, you can send me a message on [Twitter](https://twitter.com/lorencerri).

## Setup (Planned)

_Requires [Node.js](nodejs.org) v12 or higher_

**1.** Download or clone this repository

**2.** Run `npm run setup` to launch the setup script

**3.** Run `npm start` to start the bot

> Ensure the highest role the bot has is higher than others so it can remove their roles

If you have any questions, feel free to either ask me on [Twitter](https://twitter.com/lorencerri) or [Discord](https://discord.gg/plexidev).

## Commands (Planned)

_You can mention the bot instead of using a prefix_

**`g!prefix [prefix]`** Displays the current prefix, changes the prefix if specified

**`g!limits [index] [value]`** Displays the limits, changes an index's value if specified

**`g!reset [type]`** Resets the specified data or collection

**`g!recent [ID]`** Displays recent moderation actions that can trigger the bot's limits

**`g!log [#channel]`** Assigns the logging channel for actions and limit changing

## Example Images

*Thanks for reading! Feel free to star this repo if you've found it useful 😊*
