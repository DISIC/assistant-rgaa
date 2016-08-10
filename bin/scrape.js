const fs = require('fs');
const request = require('request');



/**
 *
 */
const fetchPage = (url) =>
	new Promise((resolve, reject) =>
		request(url, (error, response, body) => {
			if (error) {
				resolve(body);
			}

			if (response.statusCode !== 200) {
				reject(`Error ${response.statusCode}`);
			}

			resolve(body);
		})
	);

/**
 *
 */
const writeJson = (destination) => (reference) =>
	fs.writeFileSync(
		destination,
		JSON.stringify(
			reference,
			null,
			'\t'
		)
	);

/**
 *
 */
const logError = (error) =>
	console.error(error);



/**
 *
 */
module.exports = {
	fetchPage,
	writeJson,
	logError
}
