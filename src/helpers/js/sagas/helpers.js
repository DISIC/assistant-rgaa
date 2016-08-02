import {takeEvery} from 'redux-saga';
import {call} from 'redux-saga/effects';
import {partial} from 'lodash';
import {APPLY, REVERT} from '../../../common/actions/helpers';
import {getInfo, getModule} from '../api/helpers';



/**
 *	Context variables passed down to each helper.
 */
const CONTEXT = {
	document: window.document
};

/**
 *	returns a call effect that will call a method on the given
 *	helper, passing it context variables and options.
 */
const createCall = (id, method, helper) => {
	const {name, options} = getInfo(helper);
	const module = getModule(name);
	options.id = `rgaat-Helper--${id}-${name}`;

	return call(module[method], CONTEXT, options);
};

/**
 *	Applies a list of helpers.
 */
function* applySaga({payload}) {
	yield payload.helpers.map(
		partial(createCall, payload.id, 'apply')
	);
}

/**
 *	Reverts a list of helpers.
 */
function* revertSaga({payload}) {
	yield payload.helpers.map(
		partial(createCall, payload.id, 'revert')
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
