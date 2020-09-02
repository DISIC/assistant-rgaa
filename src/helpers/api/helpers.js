import * as modules from '../helpers';



/**
 *
 */
const getModule = (name) =>
	modules[name];

/**
 *	Extracts info out of the given helper descriptor.
 *
 *	@param {string|array} helper - Helper descriptor, i.e. an
 *		object containing a key "helper", holding the helper name,
 *		and an arbitrary number of other options.
 */
export const info = ({helper, ...args}) => ({
	args,
	name: helper,
	module: getModule(helper)
});

/**
 *	Asks for the given helper to describe its potential actions.
 *
 *	@param {object} helper - Helper descriptor.
 */
export const describe = (intl, helper) => {
	const {module, args} = info(helper);
	return module.describe(intl, args);
};

/**
 *
 */
export const component = (helper) => {
	const {module, args} = info(helper);
	return ('component' in module)
		? module.component(args)
		: null;
};

/**
 *	Creates an uuid from a test id and a helper index.
 *	Also ensures that there is no dot in the name, so it can
 *	be queried if used as an id or class name in the DOM.
 */
const createId = (id, index) =>
	`rgaaExt-Helper--${id}-${index}`.replace(/\./g, '-');

/**
 *	Calls a specific function on each of the given helpers.
 *
 *	@param {string} id - Id.
 *	@param {string|array} helper - Helper descriptor.
 *	@param {string} func - Name of the module's function to call,
 *		either 'apply' or 'revert'.
 */
const toggleHelpers = (id, helpers, toggle) => {
	const method = toggle ? 'apply' : 'revert';

	document.body.classList.toggle('rgaaExt-Body', toggle);
	document.body.classList.toggle('rgaaExt-Body--withHelpers', toggle);
	document.body.classList.toggle(`rgaaExt-Body--withHelper-${id}`, toggle);

	try {
		helpers.forEach((helper, i) => {
			const {name, module, args} = info(helper);
			module[method](createId(id, i), args);
			document.body.classList.toggle(`rgaaExt-Body--${name}Helper`, toggle);
		});
	} catch (e) {
		// eslint-disable-next-line no-console
		console.error(e);
	}
};

/**
 *
 */
const isApplied = (id) =>
	document.body.classList.contains(`rgaaExt-Body--withHelper-${id}`);

/**
 *
 */
export const applyHelpers = (id, helpers) => {
	if (!isApplied(id)) {
		return toggleHelpers(id, helpers, true);
	}
	return false;
};

/**
 *
 */
export const revertHelpers = (id, helpers) =>
	toggleHelpers(id, helpers, false);
