import {get, find} from 'lodash';
import {api} from '../../common/api/extension';



/**
 *
 */
export const openWindow = api('windows.create');
export const closeWindow = api('windows.remove');

/**
 *
 */
const getWindowApi = api('windows.get');

/**
 *
 */
export const getWindow = (id, options = {populate: true}) =>
	getWindowApi(id, options);

/**
 * get the window first tab's id by making a new getWindow request if necessary
 *
 * this is necessary because depending on context, a window object might not
 * have a tabs property (ie, the result of a windows.create in firefox < 52)
 */
export const getWindowTabId = async (windowObject) => {
	const id = get(windowObject, 'tabs[0].id');

	if (id) {
		return id;
	}

	const window = getWindow(windowObject.id, {populate: true});
	return get(window, 'tabs[0].id');
};

/**
 *
 */
export const getWindowObject = (url, options) => {
	const views = chrome.extension.getViews(options);
	return find(views, (windowObject) =>
		windowObject.location.href === url
	);
};
