#!/usr/bin/env node
const scrapeReference32016 = require('./scrapeReference32016');



/**
 *	Scrapes version 3-2017 of the RGAA reference into JSON.
 *
 *	@see scrapeReference32016()
 */
module.exports = (options) => {
	const scrape = scrapeReference32016(options);

	return (html) => {
		const reference = scrape(html);

		return {
			name: 'RGAA 3-2017',
			version: '3-2017',
			themes: reference.themes
		};
	};
};
