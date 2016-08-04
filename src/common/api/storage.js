import {keys, noop} from 'lodash';



const Storage = chrome.storage.local;
const Runtime = chrome.runtime;



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


export default {
	getItem,
	setItem,
	removeItem,
	getAllKeys
};
