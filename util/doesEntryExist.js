const doesEntryExist = (client, action, targetID, guildID) => {
    return new Promise(async function (resolve, reject) {

        let entries = client.settings.get(guildID, action, []);
        /*
        {
            timestamp: <Date>,
            target: {
                id: <String>,
                tag: <String>
            },
            executor: {
                id: <String>,
                tag: <String>
            }
        }
        */
        //console.log(`${entries.length} entries found for ${action}`);

        const oneHourAgo = Date.now() - 1000 * 60 * 60;

        // Find items older than 1 hour
        let olderThanOneHour = entries.filter(i => !(i.timestamp > oneHourAgo));
        //console.log(`${olderThanOneHour.length} entries found older than 1 hour`);

        // Add to history
        if (olderThanOneHour.length > 0) await client.settings.set(guildID, `historical_${action}`, [...olderThanOneHour, ...client.settings.get(`history_${guildID}_${action}`, [])]);

        // Remove items older than 1 hour
        entries = entries.filter(i => i.timestamp > oneHourAgo);

        // Save new array
        await client.settings.set(`${guildID}_${action}`, entries);

        // Check for existing items in the new array
        resolve(entries.find(i => i.target.id === targetID));

    });
};

module.exports = doesEntryExist;