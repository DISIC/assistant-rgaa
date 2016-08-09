import {isArray, first, tail} from 'lodash';



/**
 *
 */
export const getModule = (name) =>
	// eslint-disable-next-line global-require
	require(`../helpers/${name}`);

/**
 *	Extracts info out of the given helper descriptor.
 *
 *	@param {string|array} helper - Helper descriptor. This can
 *		be either a string containing the helper's name, or an
 *		array containing the helper's name, followed by its
 *		arguments, for example : ["helperName", "arg1", "arg2"].
 */
export const info = (helper) => {
	const infoArray = isArray(helper) ? helper : [helper];
	const name = first(infoArray);
	const args = tail(infoArray);
	const module = getModule(name);

	return {
		module,
		name,
		args
	};
};

/**
 *	Asks for the given helper to describe its potential actions.
 *
 *	@param {string|array} helper - Helper descriptor.
 */
export const describe = (helper) => {
	const {module, args} = info(helper);
	return module.describe(...args);
};
