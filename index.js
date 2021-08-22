require('dotenv').config();

const Logger = require('@ayanaware/logger');
const log = Logger.get();

const { preflight } = require('./scripts/preflight');

if (!preflight())
	return log.error(
		'An error was encountered during the preflight checklist. Read above for more info.'
	);
else
	return log.info(
		'Preflight checklist successfully completed. No errors found.'
	);
