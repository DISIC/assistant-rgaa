const fs = require('fs');
const request = require('request');
const resolve = require('url').resolve;



/**
 *
 */
const fetchFrom = (url) =>
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
const jsonify = (data) =>
	JSON.stringify(data, null, '\t');

/**
 *
 */
const writeJsonTo = (destination) => (body) =>
	fs.writeFileSync(destination, jsonify(body));

/**
 *
 */
const logError = (error) =>
	console.error(error);

/**
 *	Ugly thing that prepends the given URL to anchor links in
 *	a string.
 */
const linkAnchorsTo = (url) => (html) =>
	html.replace(
		/(href=")([^"]+)/i,
		(match, start, href) =>
			start + resolve(url, href)
	);



/**
 *
 */
module.exports = {
	fetchFrom,
	writeJsonTo,
	logError,
	linkAnchorsTo
};
