const parsems = require('parse-ms');

module.exports = class Utils {
    constructor(client) {
        this.client = client;
    }

    toProperCase(str) {
        str = str.split('_');
        str = str.map(i => i.charAt(0).toUpperCase() + i.substring(1));
        return str.join(' ');
    }

    parseTime(ms, { fromNow = false, includeSeconds = false, base = '' } = {}) {
        let obj = (fromNow ? parsems(ms) : parsems(Date.now() - ms));
        for (var i in obj) {
            if (obj[i] === 0 || ['milliseconds', 'microseconds', 'nanoseconds'].includes(i) || (!includeSeconds && i === 'seconds')) continue;
            base += `${obj[i]} ${(obj[i] === 1 ? i.slice(0, -1) : i)} `;
        }
        return (!base ? 'Just now' : base + 'ago');
    }

    convertActionType(type) {
        switch (type) {
            case 'CHANNEL_DELETE':
                return 'deleted channel'
                break;
            case 'CHANNEL_CREATE':
                return 'created channel'
                break;
        }
    }

    convertEntries(entries) {
        if (!(entries instanceof Array)) entries = [entries];
        let str = '';
        for (var i = 0; i < entries.length; i++) str += `\`${this.client.Utils.parseTime(entries[i].timestamp)}\` | <@${entries[i].executor.id}> ${this.convertActionType(entries[i].action)} **${entries[i].target.displayName}**\n`;
        return str;
    }

}