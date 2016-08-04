import reference from './reference';
import container from '../../common/reducers/container';
import helpers from '../../common/reducers/helpers';



/**
 *	Exports all reducers of the application.
 *
 *	note: combineReducers will need to be called on this in order to work
 */
export default {
	container,
	helpers,
	reference
};
