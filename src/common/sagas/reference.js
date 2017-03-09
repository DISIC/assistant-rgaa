import {takeEvery} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import {setOption} from '../api/options';
import {getReference, flattenReference} from '../api/reference';
import {getHelpers} from '../api/helpers';
import {fetchInstructions} from '../api/instructions';
import * as referenceActions from '../actions/reference';
import {setHelpers} from '../actions/helpers';
import {set as setInstructions} from '../actions/instructions';
import {reset as resetChecklist} from '../actions/checklist';



/**
 *
 */
function* setReferenceVersionWorker({payload: {version}}) {
	const [reference, helpers, instructions] = yield [
		call(getReference, version),
		call(getHelpers, version),
		call(fetchInstructions, version)
	];

	const flattened = flattenReference(reference);

	yield put(resetChecklist());
	yield put(referenceActions.setReference(flattened.reference));
	yield put(referenceActions.setThemes(flattened.themes));
	yield put(referenceActions.setCriteria(flattened.criteria));
	yield put(referenceActions.setTests(flattened.tests));
	yield put(setHelpers(helpers));
	yield put(setInstructions(instructions));

	yield call(setOption, 'reference', version);
}



/**
 *
 */
export function* watchSetReferenceVersion() {
	yield* takeEvery(referenceActions.SET_REFERENCE_VERSION, setReferenceVersionWorker);
}

