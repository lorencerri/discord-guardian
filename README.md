> 🎉🎉 **A rewrite is currently in progress! The new update will utilize all of Discord's new features (Buttons, User Contexts, etc.) and comply with their upcoming changes (slash commands). __Give the repo a star to stay up to date for when it drops!__** 🎉🎉

## Guardian

Guardian allows server owners to set strict limits on administration actions. These actions include: bans, kicks, channel creations/deletions, and role creations/deletions. Once someone meets any of these limits, their Discord permissions are automatically revoked via removing all of their roles.

## Custom Hosting

Want this bot hosted for you? Send me a message on either **[Discord](https://discord.gg/plexidev)** (lorencerri#2113) or **[Twitter](https://twitter.com/lorencerri)**!
> - Custom Username, Avatar, & Status
> - Fast-tracked Feature Requests
> - Independent Hosting (better performance)

## Hey There 👋

I work on these projects in my spare time, if you'd like to support me, you can do so via [Patreon! ❤️](https://www.patreon.com/lorencerri)

*Need a custom Discord bot or project completed? Feel free to send me a message on [Discord](https://discord.gg/plexidev) (lorencerri#2113) or [Twitter](https://twitter.com/lorencerri)!*

## Suggesting Features

Please suggest features via the [issues](https://github.com/lorencerri/discord-guardian) page. Alternatively, you can send me a message on [Twitter](https://twitter.com/lorencerri).

## Setup

_Requires [Node.js](nodejs.org) v12 or higher_

**1.** Download or clone this repository

**2.** Install required dependencies using `npm install` within the repository folder

**3.** Create a .env file at the root level of the project and add `BOT_TOKEN=<TOKEN>` to it. (Replace \<TOKEN\> with your TOKEN)

**4.** Configure `config.js` to your personal preferences

**5.** Run `npm start` to start the bot

**6.** Ensure the highest role the bot has is higher than others so it can remove their roles

If you have any questions, feel free to either ask me on [Twitter](https://twitter.com/lorencerri) or [Discord](https://discord.gg/plexidev).

## Commands

_You can mention the bot instead of using a prefix_

**`g!prefix [prefix]`** Displays the current prefix, changes the prefix if specified

**`g!limits [index] [value]`** Displays the limits, changes an index's value if specified

**`g!reset [type]`** Resets the specified data or collection

**`g!recent [ID]`** Displays recent moderation actions that can trigger the bot's limits

**`g!log [#channel]`** Assigns the logging channel for actions and limit changing

## Example Images

_The prefix shown in the images are different due to the ability to change the prefix using `g!prefix newPrefix`_

_g!limits command_ <br>
![](https://i.plexidev.org/w05p)

_Image of a limit reached notification_ <br>
![](https://i.plexidev.org/gVYq)

_g!recent command_ <br>
![](https://i.plexidev.org/nfMD)

*Thanks for reading! Feel free to star this repo if you've found it useful 😊*
