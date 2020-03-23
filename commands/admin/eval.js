const { Command } = require('discord-akairo');
const fetch = require('node-fetch');

class EvalCommand extends Command {
    constructor() {
        super('eval', {
            aliases: ['eval'],
            ownerOnly: true
        });
    }

    async clean(client, text) {
        if (text && text.constructor.name == "Promise")
            text = await text;
        if (typeof text !== "string")
            text = require("util").inspect(text, { depth: 1 });
    
        text = text
            .replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/g, "@" + String.fromCharCode(8203))
            .replace(client.token, "<TOKEN>");
    
        return text;
    }

    hastebin(input, extension) {
        return new Promise(function (res, rej) {
            if (!input) rej("[Error] Missing Input");
            fetch("https://hasteb.in/documents", { method: 'POST', body: input })
                .then(res => res.json())
                .then(body => {
                    res("https://hasteb.in/" + body.key + ((extension) ? "." + extension : ""));
            }).catch(e => rej(e));
        })
      }

    async exec(message) {
        const code = message.content.slice(this.client.commandHandler.prefix(message).length + 4).trim();
        try {
            const evaled = eval(code);
            const clean = await this.clean(this.client, evaled);
            if (clean.length > 800) message.channel.send(await this.hastebin(clean));
            else message.channel.send(`\`\`\`js\n${clean}\n\`\`\``);
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${await this.clean(this.client, err)}\n\`\`\``);
        }
    }
}

module.exports = EvalCommand;