import {combineReducers} from 'redux';
import reference from './reference';
import container from '../../../common/reducers/container';
import helpers from '../../../common/reducers/helpers';



/**
 *	Exports all reducers of the application.
 */
export default combineReducers({
	container,
	helpers,
	reference
});
