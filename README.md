## Guardian

Guardian allows server owners to set strict limits on administration actions. These actions include: bans, kicks, channel creations/deletions, and role creations/deletions. Once these limits are met, their Discord permissions are automatically revoked via removing all of their roles.

## Hey There 👋

<a href="https://www.buymeacoffee.com/lorencerri" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

> Need a custom Discord bot or project completed? Feel free to send me a message on [Discord](https://discord.gg/plexidev) (lorencerri#2113) or [Twitter](https://twitter.com/lorencerri)!

## Setup

_Requires Node v12 for discord.js_

**1.** Download or clone this repository

**2.** Install required dependencies using `npm install` within the repository folder

**3.** Create a .env file and add `BOT_TOKEN=<TOKEN>` to it. (Replace \<TOKEN\> with your TOKEN)

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

*Thanks for reading! 😊*
