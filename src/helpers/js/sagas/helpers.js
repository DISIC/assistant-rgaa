import {takeEvery} from 'redux-saga';
import {call} from 'redux-saga/effects';
import {isArray, first, tail} from 'lodash';
import {APPLY, REVERT} from '../../../common/actions/helpers';
import {getModule} from '../api/helpers';



/**
 *
 */
const createId = (id, index) =>
	`rgaa-Helper--${id}-${index}`;

/**
 *	Returns a call effect that will call a function of the
 *	given helper, passing it context variables and options.
 *
 *	@param func {string} - The module's function to call, either
 *		'apply' or 'revert'.
 *	@param helper {string|array} - Helper descriptor. This can
 *		be either a string containing the helper's name, or an
 *		array containing the helper's name, followed by its
 *		arguments, for example : ["helperName", "arg1", "arg2"].
 *	@param id {string} - Id.
 *	@return {function} - Call effect.
 */
const createCall = (func, helper, id) => {
	const info = isArray(helper) ? helper : [helper];
	const name = first(info);
	const args = tail(info);
	const module = getModule(name);

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
