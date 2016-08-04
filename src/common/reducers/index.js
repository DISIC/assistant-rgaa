import {combineReducers} from 'redux';
import container from './container';
import helpers from './helpers';
import reference from './reference';
import tabs from './tabs';



export const reducers = {
	container,
	helpers,
	reference,
	tabs
};

export default combineReducers(reducers);
