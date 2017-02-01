import {REDUX_ACTION} from '../common/actions/runtime';
import {APPLY, REVERT} from '../common/actions/helpers';
import {applyHelpers, revertHelpers} from './api/helpers';



/**
 *
 */
const handleAction = ({type, payload}) => {
	// eslint-disable-next-line default-case
	switch (type) {
		case APPLY:
			applyHelpers(payload.id, payload.helpers);
			break;

		case REVERT:
			revertHelpers(payload.id, payload.helpers);
			break;
	}
};

/**
 *
 */
chrome.runtime.onMessage.addListener(({type, action}) => {
	if (type === REDUX_ACTION) {
		handleAction(action);
	}
});
