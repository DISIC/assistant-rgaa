import $ from 'jquery';
import {concat, without} from 'lodash/fp';



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
const forEachChild = (root, selector, callback) => {
	const elements = root
		? root.find(selector)
		: $(selector);

	elements.each((i, element) =>
		callback($(element))
	);
};

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
const muteAttributeOn = (element, attribute) => {
	renameAttribute(element, attribute, attributeAlias(attribute));
	updateMutedAttributes(element, concat(attribute));
};

/**
 *
 */
const restoreAttributeOn = (element, attribute) => {
	renameAttribute(element, attributeAlias(attribute), attribute);
	updateMutedAttributes(element, without([attribute]));
};

/**
 *
 */
export const muteAttribute = (attribute, root = null) => {
	const selector = `[${attribute}]:not([class^="rgaaExt"])`;

	forEachChild(root, selector, (element) => {
		muteAttributeOn(element, attribute);
	});
};

/**
 *
 */
export const restoreAttribute = (attribute, root = null) => {
	const alias = attributeAlias(attribute);
	const selector = `[${alias}]`;

	forEachChild(root, selector, (element) => {
		restoreAttributeOn(element, attribute);
	});
};

/**
 *
 */
export const restoreAllAttributes = (root) => {
	forEachChild(root, `[${MutedAttribute}]`, (element) => {
		getMutedAttributes(element).forEach((attribute) => {
			restoreAttributeOn(element, attribute);
		});
	});
};
