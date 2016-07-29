import {
	REQUEST_POPUP,
	SET_POPUP,
	REQUEST_TOGGLE
} from '../../common/actions/container';
import {OPEN} from '../../common/actions/options';



export const receive = [
	REQUEST_POPUP,
	OPEN
];

export const send = [
	SET_POPUP,
	REQUEST_TOGGLE
];
