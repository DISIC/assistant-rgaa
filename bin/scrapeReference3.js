#!/usr/bin/env node
const _ = require('lodash');
const cheerio = require('cheerio');
const installResolveLinksPlugin = require('./resolveLinksPlugin');



/**
 *	Scrapes version 3 of the RGAA reference into JSON.
 *
 *	@param {object} options - Options:
 *		- {string} source - Source URL.
 *		- {string} destination - Destination file.
 *		- {boolean} merge - Whether or not to merge the output
 *			file with the existing one, if any.
 */
module.exports = (options) => (html) => {
	const $ = cheerio.load(html, {
		normalizeWhitespace: true,
		decodeEntities: false
	});

	installResolveLinksPlugin($);

	const scrapeTest = (i, el) => {
		const element = $(el);
		const title = element.resolveLinks(options.source).html().trim();
		const idMatches = /^Test (\d+\.\d+\.\d+)/i.exec(title);

		if (idMatches === null) {
			return null;
		}

		const id = idMatches[1];

		return {id, title};
	};

	const scrapeCriterion = (i, el) => {
		const element = $(el);
		const title = element
			.find('h5')
			.resolveLinks(options.source)
			.html()
			.trim();

		const idMatches = /^Critère (\d+\.\d+)/i.exec(title);

		if (idMatches === null) {
			return null;
		}

		const id = idMatches[1];
		const testElements = element.find('.rte > ul > li');
		const tests = testElements.map(scrapeTest).get();

		return {id, title, tests};
	};

	const scrapeTheme = (i, el) => {
		const element = $(el);
		const fullTitle = element
			.find('h4')
			.resolveLinks(options.source)
			.html()
			.trim();

		const title = fullTitle.replace(/^(\d+\.\d+\.)/i, '');
		const idMatches = /^(\d+)/i.exec(title);

		if (idMatches === null) {
			return null;
		}

		const id = idMatches[1];
		const criterionStopSelector = 'article:not([id^="critre-' + id + '"])';
		const criterionElements = element.nextUntil(criterionStopSelector);
		const criteria = criterionElements.map(scrapeCriterion).get();

		return {id, title, criteria};
	};

	const scrapeThemes = () => {
		const themeRx = /^12\d+-[a-z]+/i;
		const themeElements = $('article').filter((i, el) =>
			themeRx.test($(el).attr('id'))
		);

		return themeElements.map(scrapeTheme).get();
	};

	return {
		name: 'RGAA 3',
		version: '3',
		themes: scrapeThemes()
	};
};
