import {combineReducers} from 'redux';
import helpers from './helpers';
import reference from './reference';
import container from '../../../common/reducers/container';



/**
 *	Exports all reducers of the application.
 */
export default combineReducers({
	container,
	helpers,
	reference
});
