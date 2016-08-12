#!/usr/bin/env node
const _ = require('lodash');
const cheerio = require('cheerio');
const linkAnchorsTo = require('./linkAnchorsTo');



/**
 *	Scrapes version 3-2016 of the RGAA reference into JSON.
 *
 *	@param {object} options - Options:
 *		- {string} source - Source URL.
 *		- {string} destination - Destination file.
 *		- {boolean} merge - Whether or not to merge the output
 *			file with the existing one, if any.
 */
module.exports = (options) => (html) => {
	const linkAnchors = linkAnchorsTo(options.source);
	const $ = cheerio.load(html, {
		normalizeWhitespace: true,
		decodeEntities: false
	});

	const scrapeTest = (i, el) => {
		const element = $(el);
		const title = linkAnchors(element.html().trim());
		const idMatches = /^Test (\d+\.\d+\.\d+)/i.exec(title);

		if (idMatches === null) {
			return null;
		}

		const id = idMatches[1];

		return {id, title};
	};

	const scrapeCriterion = (i, el) => {
		const element = $(el);
		const title = linkAnchors(element.find('h3').html().trim());
		const idMatches = /^Critère (\d+\.\d+)/i.exec(title);

		if (idMatches === null) {
			return null;
		}

		const id = idMatches[1];
		const testElements = element.find('li[id^="test"]');
		const tests = testElements.map(scrapeTest).get();

		return {id, title, tests};
	};

	const scrapeTheme = (i, el) => {
		const element = $(el);
		const title = linkAnchors(element.find('h2').html().trim());
		const idMatches = /^(\d+)/i.exec(title);

		if (idMatches === null) {
			return null;
		}

		const id = idMatches[1];
		const criterionElements = element.children('article');
		const criteria = criterionElements.map(scrapeCriterion).get();

		return {id, title, criteria};
	};

	const scrapeThemes = () =>
		$('main > section').map(scrapeTheme).get();

	return {
		name: 'RGAA 3-2016',
		version: '3-2016',
		themes: scrapeThemes()
	};
};
