import {keys} from 'lodash';



const Storage = chrome.storage.local;
const Runtime = chrome.runtime;



const setItem = (key, data, callback) => {
	Storage.set({[key]: data}, () => {
		if (Runtime.lastError) {
			return callback(Runtime.lastError);
		}
		return callback(null);
	});
};

const getItem = (key, callback) => {
	Storage.get(key, (item) => {
		if (Runtime.lastError) {
			return callback(Runtime.lastError);
		}
		const data = item[key] || item;
		return callback(null, data);
	});
};

const removeItem = (key, callback) => {
	Storage.remove(key, () => {
		if (Runtime.lastError) {
			return callback(Runtime.lastError);
		}
		return callback(null);
	});
};

const getAllKeys = (callback) => {
	Storage.get(null, (items) => {
		if (Runtime.lastError) {
			return callback(Runtime.lastError);
		}
		return callback(null, keys(items));
	});
};

export default {
	getItem,
	setItem,
	removeItem,
	getAllKeys
};
