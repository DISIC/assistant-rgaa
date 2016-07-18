import {combineReducers} from 'redux';
import tabs from './tabs';
import container from '../../common/reducers/container';



/**
 *	Exports all reducers of the application.
 */
export default combineReducers({
	container,
	tabs
});
