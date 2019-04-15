#!/usr/bin/env node
const _ = require('lodash');
const cheerio = require('cheerio');
const installResolveLinksPlugin = require('./resolveLinksPlugin');



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
	const $ = cheerio.load(html, {
		normalizeWhitespace: true,
		decodeEntities: false
	});

	installResolveLinksPlugin($);

	const scrapeTest = (i, el) => {
		const element = $(el);
		const title = element
			.resolveLinks(options.source)
			.html()
			.trim();
		const idMatches = /^Test (\d+\.\d+\.\d+)/i.exec(title);

		if (idMatches === null) {
			return null;
		}

		const id = idMatches[1];

		let formattedTitle = title.replace(
			/^Test \d+\.\d+\.\d+&nbsp;:\s/i,
			''
		);

		if (element.find('ul').length) {
			let conditions = element.find('ul')
				.resolveLinks(options.source)
				.html()
				.trim();
			conditions = `<ul>${conditions}</ul>`;
			formattedTitle = formattedTitle.replace(
				/<ul>(.*)<\/ul>/,
				''
			);
			formattedTitle = `<p>${formattedTitle}</p>${conditions}`;
		} else {
			formattedTitle = `<p>${formattedTitle}</p>`;
		}

		return {id, title: formattedTitle};
	};

	const scrapeCriterion = (i, el) => {
		const element = $(el);
		const title = element
			.find('h3')
			.resolveLinks(options.source)
			.html()
			.trim();

		const idMatches = /^Critère (\d+\.\d+)/i.exec(title);

		if (idMatches === null) {
			return null;
		}

		const id = idMatches[1];

		const levelMatches =
			/<span aria-label="(?:.+)"><span aria-hidden="true">(\w+)<\/span><\/span>/.exec(title);
		const level = levelMatches !== null
			? levelMatches[1]
			: null;

		const formattedTitle = title.replace(
			/^Critère \d+\.\d+ \[<span(.*)<\/span>\] /i,
			''
		);

		const testElements = element.find('li[id^="test"]');
		const tests = testElements.map(scrapeTest).get();

		return {id, title: formattedTitle, level, tests};
	};

	const scrapeTheme = (i, el) => {
		const element = $(el);
		const title = element
			.find('h2')
			.resolveLinks(options.source)
			.html()
			.trim();

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
		name: 'RGAA 3-2017',
		version: '3-2017',
		themes: scrapeThemes()
	};
};
