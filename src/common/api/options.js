import {assign} from 'lodash';
import chromeStorage from './storage';



/**
 *
 */
export const get = (key) =>
	chromeStorage.getItem('options').then(options =>
		options[key]
	);

/**
 *
 */
export const save = (key, value) =>
	chromeStorage.getItem('options').then(options =>
		chromeStorage.setItem('options', assign({}, options, {[key]: value}))
	);
