import * as messages from './messages';
import * as syncedActions from './synced-actions';
import * as helpers from './helpers';



/**
 *	Exports all sagas of the application.
 */
export default function* sagas() {
	yield [
		messages.watchSend(),
		syncedActions.watchSyncedActions(),
		helpers.watchApply(),
		helpers.watchRevert()
	];
}
