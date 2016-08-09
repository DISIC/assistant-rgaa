import {takeEvery} from 'redux-saga';
import {call} from 'redux-saga/effects';
import {APPLY, REVERT} from '../../common/actions/helpers';
import {info} from '../api/helpers';



/**
 *	Creates an uuid from a test id and a helper index.
 *	Also ensures that there is no dot in the name, so it can
 *	be queried if used as an id or class name in the DOM.
 */
const createId = (id, index) =>
	`rgaaExt-Helper--${id}-${index}`.replace(/\./g, '-');

/**
 *	Returns a call effect that will call a function of the
 *	given helper, passing it context variables and options.
 *
 *	@param {string} func - Name of the module's function to call,
 *		either 'apply' or 'revert'.
 *	@param {string|array} helper - Helper descriptor.
 *	@param {string} id - Id.
 *	@return {function} - Call effect.
 */
const createCall = (func, helper, id) => {
	const {module, args} = info(helper);

	// creates a call effect that will call a function of the
	// module, with id as a first argument, and args as the rest.
	return call.apply(null, [
		module[func],
		id,
		...args
	]);
};



/**
 *	Applies a list of helpers.
 */
function* applySaga({
	payload: {
		helpers,
		id
	}
}) {
	yield helpers.map((helper, index) =>
		createCall('apply', helper, createId(id, index))
	);
}

/**
 *	Reverts a list of helpers.
 */
function* revertSaga({
	payload: {
		helpers,
		id
	}
}) {
	yield helpers.map((helper, index) =>
		createCall('revert', helper, createId(id, index))
	);
}



/**
 *
 */
export function* watchApply() {
	yield* takeEvery(APPLY, applySaga);
}

/**
 *
 */
export function* watchRevert() {
	yield* takeEvery(REVERT, revertSaga);
}
