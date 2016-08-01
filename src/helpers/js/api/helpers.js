import {isString, isObject} from 'lodash';



/**
 *
 */
export const getModule = (name) =>
	require(`../helpers/${name}`);

/**
 *	If helper is an object, then it should contain a name and
 *	optionnally some options. Otherwise, helper should be a
 *	string holding the helper's name.
 */
export const getInfo = (helper) => {
	if (isString(helper)) {
		return {
			name: helper,
			options: {}
		};
	}

	if (isObject(helper)) {
		return {
			name: '',
			options: {},
			...helper
		};
	}

	throw new Error(
		'Helper should be either a string or an object with the helper\'s name and options.'
	);
};
