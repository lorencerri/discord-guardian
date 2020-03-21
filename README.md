# discord-guardian
Guardian, a purpose built anti-nuke Discord bot.

#### Setup

*Requires Node v12 for discord.js*

*Requires Postgres for database management*

**1.** Add `BOT_TOKEN` & `POSTGRES_PASSWORD` to a .env file

**2.** Run `node database/sync.js` to configure the database

**3.** Configure `config.js` to your personal preferences

**4.** Run `npm start` to start the bot

#### Commands

*You can mention the bot instead of using a prefix*

**`g!prefix [prefix]`** Displays the current prefix, changes the prefix if specified

**`g!limits [index] [value]`** Displays the limits, changes an index's value if specified