import $ from 'jquery';
import {concat, without} from 'lodash/fp';



/**
 *	Attributes muting works by aliasing original attributes.
 *	The API also maintains a custom attribute which holds the
 *	name of all muted attributes on an element. This allows
 *	for better discoverability (i.e. CSS selectors can be used
 *	to target elements with muted attributes).
 *
 *	For example, here is a link, before and after muting its
 *	href attribute:
 *
 *	<a href="example.org" />
 *	<a data-rgaa-ext-muted-href="example.org" data-rgaa-ext-muted="href" />
 */

/**
 *
 */
const MutedAttribute = 'data-rgaa-ext-muted';

/**
 *
 */
const attributeAlias = (attribute) =>
	`${MutedAttribute}-${attribute}`;

/**
 *
 */
export const mutedAttributeSelector = (attribute, base = '') => {
	const alias = attributeAlias(attribute);
	return `${base}[${alias}]`;
};

/**
 *
 */
export const anyMutedAttributeSelector = (base = '') =>
	`${base}[${MutedAttribute}]`;

/**
 *
 */
const renameAttribute = (element, from, to) => {
	element.attr(to, element.attr(from));
	element.removeAttr(from);
};

/**
 *
 */
const getMutedAttributes = (element) => {
	const list = element.attr(MutedAttribute);
	return list
		? list.split(',')
		: [];
};

/**
 *
 */
const setMutedAttributes = (element, list) => {
	if (list.length) {
		element.attr(MutedAttribute, list.join(','));
	} else {
		element.removeAttr(MutedAttribute);
	}
};

/**
 *
 */
const updateMutedAttributes = (element, update) => {
	const list = getMutedAttributes(element);
	setMutedAttributes(element, update(list));
};

/**
 *
 */
const muteAttributeOnElement = (element, attribute) => {
	renameAttribute(element, attribute, attributeAlias(attribute));
	updateMutedAttributes(element, concat(attribute));
};

/**
 *
 */
const restoreAttributeOnElement = (element, attribute) => {
	renameAttribute(element, attributeAlias(attribute), attribute);
	updateMutedAttributes(element, without([attribute]));
};

/**
 *
 */
export const muteAttribute = (elements, attribute) => {
	const selector = `[${attribute}]:not([class^="rgaaExt"])`;

	elements
		.filter(selector)
		.each((i, element) => {
			muteAttributeOnElement($(element), attribute);
		});
};

/**
 *
 */
export const restoreAttribute = (elements, attribute) => {
	const alias = attributeAlias(attribute);
	const selector = `[${alias}]`;

	elements
		.filter(selector)
		.each((i, element) => {
			restoreAttributeOnElement($(element), attribute);
		});
};

/**
 *
 */
export const restoreAllAttributes = (elements) => {
	elements.each((i, el) => {
		const element = $(el);

		getMutedAttributes(element).forEach((attribute) => {
			restoreAttributeOnElement(element, attribute);
		});
	});
};
