import {keys, noop, filter, startsWith} from 'lodash';
import {keyPrefix} from 'redux-persist/constants';



const Storage = chrome.storage.local;
const Runtime = chrome.runtime;
const persistPrefix = keyPrefix;



const setItem = (key, data, callback = noop) =>
	new Promise((resolve, reject) => {
		Storage.set({[key]: data}, () => {
			if (Runtime.lastError) {
				callback(Runtime.lastError);
				reject(Runtime.lastError);
			}
			callback(null);
			resolve();
		});
	});

const getItem = (key, callback = noop) =>
	new Promise((resolve, reject) => {
		Storage.get(key, (item) => {
			if (Runtime.lastError) {
				callback(Runtime.lastError);
				reject(Runtime.lastError);
			}
			const data = item[key] || item;
			callback(null, data);
			resolve(data);
		});
	});

const removeItem = (key, callback = noop) =>
	new Promise((resolve, reject) => {
		Storage.remove(key, () => {
			if (Runtime.lastError) {
				callback(Runtime.lastError);
				reject(Runtime.lastError);
			}
			resolve();
		});
	});

const getAllKeys = (callback = noop) =>
	new Promise((resolve, reject) => {
		Storage.get(null, (items) => {
			if (Runtime.lastError) {
				callback(Runtime.lastError);
				reject(Runtime.lastError);
			}
			const allKeys = keys(items);
			callback(null, allKeys);
			resolve(allKeys);
		});
	});

/*
 * this is made to get around the fact that redux-persist `purgeAll`
 * doesn't tell us when it is finished. So we'll want to `purgeAll`
 * "by hand"
 */
const removeAllWithPrefix = (prefix) =>
	getAllKeys().then(allKeys =>
		filter(allKeys, (key) => startsWith(key, prefix))
	).then(filteredKeys => {
		const promises = filteredKeys.map((key) => removeItem(key));
		return Promise.all(promises);
	});

export default {
	getItem,
	setItem,
	removeItem,
	getAllKeys,
	removeAllWithPrefix,
	persistPrefix
};
