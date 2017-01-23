import {keys, filter, startsWith} from 'lodash';
import {keyPrefix} from 'redux-persist/constants';



const storage = chrome.storage.local;
const runtime = chrome.runtime;
const persistPrefix = keyPrefix;



const setItem = (key, data) =>
	new Promise((resolve, reject) => {
		storage.set({[key]: data}, () => {
			if (runtime.lastError) {
				reject(runtime.lastError);
			}
			resolve();
		});
	});

const getItem = (key) =>
	new Promise((resolve, reject) => {
		storage.get(key, (item) => {
			if (runtime.lastError) {
				reject(runtime.lastError);
			}
			const data = item[key] || item;
			resolve(data);
		});
	});

const removeItem = (key) =>
	new Promise((resolve, reject) => {
		storage.remove(key, () => {
			if (runtime.lastError) {
				reject(runtime.lastError);
			}
			resolve();
		});
	});

const getAllKeys = () =>
	new Promise((resolve, reject) => {
		storage.get(null, (items) => {
			if (runtime.lastError) {
				reject(runtime.lastError);
			}
			const allKeys = keys(items);
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
		const promises = filteredKeys.map(removeItem);
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
