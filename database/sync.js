require('dotenv').config();
const database = require('./index.js');

database.models = require('./models/index.js');

database.init().then(async () => {
	try {
		await database.sync();
		console.log(`Successfully synced the database`);
		database.close();
	} catch (error) {
		console.error('Failed to sync the database.\n', error);
	}
}).catch(console.error);