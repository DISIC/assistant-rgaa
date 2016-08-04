import {combineReducers} from 'redux';
import container from './container';
import helpers from './helpers';
import options from './options';
import reference from './reference';
import tabs from './tabs';



export const reducers = {
	container,
	helpers,
	options,
	reference,
	tabs
};

export default combineReducers(reducers);
