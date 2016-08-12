#!/usr/bin/env node
const _ = require('lodash');
const cheerio = require('cheerio');
const installResolveLinksPlugin = require('./resolveLinksPlugin');



/**
 *	Scrapes version 3 of the RGAA instructions into JSON.
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

	const extractIds = (title) => {
		const idsRx = /(\d+\.\d+\.\d+)/gi;
		const ids = [];

		while ((matches = idsRx.exec(title)) !== null) {
			ids.push(matches[1]);
		}

		return ids;
	};

	const findInstructions = (element, className) => {
		const ol = element
			.filter(`.${className}`)
			.children('ol');

		if (!ol.length) {
			return null;
		}

		const text = ol
			.resolveLinks(options.source)
			.html()
			.trim();

		return `<ol>${text}</ol>`;
	};

	const scrapeTests = (el) => {
		const element = $(el);
		const text = _.trim(element.text());
		const ids = extractIds(text);
		const instructionElements = element.nextUntil('h4');
		const instructions = {
			wat: findInstructions(instructionElements, 'wat'),
			webdev: findInstructions(instructionElements, 'webdev'),
			validator: findInstructions(instructionElements, 'validate'),
			all: findInstructions(instructionElements, 'all')
		};

		const filledInstructions = _.omitBy(instructions, _.isNull);

		return _(ids)
			.keyBy(_.identity)
			.mapValues(_.constant(filledInstructions))
			.value();
	};

	const titles = $('main h4');
	const tests = _.transform(
		titles,
		(tests, title) =>
			_.merge(tests, scrapeTests(title)),
		{}
	);

	return tests;
};
