import * as messages from './messages';
import * as syncedActions from './synced-actions';



/**
 *	Exports all sagas of the application.
 */
export default function* sagas() {
	yield [
		messages.watchSend(),
		syncedActions.watchSyncedActions()
	];
}
