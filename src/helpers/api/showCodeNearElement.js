import $ from 'jquery';
import {find} from 'lodash';



/**
 * each element we add helpers to have a uniq id
 * so that we can target the helpers container easily
 */
const uniqIdsMap = [];
let currentId = 0;
const getOrCreateUniqId = (element) => {
	const found = find(uniqIdsMap, ['element', element]);
	if (found) {
		return found.id;
	}
	currentId += 1;
	uniqIdsMap.push({element, id: currentId});
	return currentId;
};

/**
 *
 */
const getContainer = (element) => {
	const id = getOrCreateUniqId(element);
	const existing = $(`[data-rgaa-ext-uniq-id="${id}"]`);
	return existing.length ? existing : false;
};

/**
 *
 */
const createContainer = (element) => {
	const id = getOrCreateUniqId(element);
	const container = `
		<div class="rgaaExt-HelperContainer" data-rgaa-ext-uniq-id="${id}"></div>
	`;
	if (document.body.contains(element.get(0))) {
		element.after(container);
	} else {
		$(document.body).prepend(container);
	}
	return getContainer(element);
};

/**
 *	Appends some code next to an element, ensuring that the
 *	code is visible in the page.
 *
 *	@param {$} element - Element.
 *	@param {$} code - Code.
 */
export default function showCodeNearElement(element, code) {
	const container = getContainer(element) || createContainer(element);
	container.append(code);
}
