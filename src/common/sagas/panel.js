import {takeEvery} from 'redux-saga';
import {sendMessage} from '../../common/api/runtime';
import {OPEN_POPUP, CLOSE_POPUP} from '../../common/actions/runtime';
import {Position} from '../api/panel';
import {SET_POSITION} from '../actions/panel';



/**
 *	Opens or closes a popup window depending on the dock position.
 */
export function* setPositionWorker({payload: position}) {
	sendMessage({
		type: (position === Position.popup)
			? OPEN_POPUP
			: CLOSE_POPUP
	});
}



/**
 *
 */
export function* watchSetPosition() {
	yield* takeEvery(SET_POSITION, setPositionWorker);
}
