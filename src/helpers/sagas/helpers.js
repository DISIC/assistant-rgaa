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
 *	Calls a specific function on each of the given helpers.
 *
 *	@param {string} func - Name of the module's function to call,
 *		either 'apply' or 'revert'.
 *	@param {string} id - Id.
 *	@param {string|array} helper - Helper descriptor.
 */
function* execHelpers(func, id, helpers) {
	const helpersInfo = yield helpers.map((helper) =>
		call(info, helper)
	);

	yield helpersInfo.map((helperInfo, i) =>
		call(
			helperInfo.module[func],
			createId(id, i),
			...helperInfo.args
		)
	);
}



/**
 *	Applies a list of helpers.
 */
function* applySaga({
	payload: {
		id,
		helpers
	}
}) {
	yield* execHelpers('apply', id, helpers);
}

/**
 *	Reverts a list of helpers.
 */
function* revertSaga({
	payload: {
		id,
		helpers
	}
}) {
	yield* execHelpers('revert', id, helpers);
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
