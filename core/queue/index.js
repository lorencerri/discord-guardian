var doesEntryExist = require('../../util/doesEntryExist.js');

async function handleAuditEntries(input, cb) {
    console.log(`[Audit Log Search] Searching for ${input[1]} of ${input[2]} in ${input[3]}...`);

    // Check if entry currently looking for is already in the database
    // NOTE: Two database types. After 60 minutes of being added to a temporary type, it'll be moved to permanaent, slower, storage.
    let exists = await doesEntryExist(...input);
    console.log(`Already exists? ${exists}`);

    // Fetch Audit Log

    // Check if new entry is in the audit log

    // If None Found
    throw new Error(`${input[1]} of ${input[2]} in ${input[3]} not found`);

}

module.exports.init = async() => {

}