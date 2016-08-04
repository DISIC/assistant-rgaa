import * as container from '../common/sagas/container';
import * as optionsActions from '../common/sagas/options';



/**
 *	Exports all sagas of the application.
 */
export default function* sagas() {
	yield [
		container.watchSetPosition(),
		container.watchRequestPopup(),
		optionsActions.watchOpen()
	];
}
