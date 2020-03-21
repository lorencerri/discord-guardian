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

~~**g!recent** Displays recent moderation actions that can trigger the bot's limits~~ *TODO*

#### Audit Log Check Implementation

*For some reason, it takes the API up to 1000ms to update the audit logs after the action occurs.*

**1.** Listener events add an entry to a queue.

**2.** Queue handler checks the audit log for new entries (up to 10 times every 100ms). If a new entry is found, all entries in the queue associated with the type found are removed.

**3.** When a new entry is added to the database, check if the limit is reached (for that type & user).