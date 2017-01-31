import {createStore, combineReducers} from 'redux';
import {has, get, remove, forEach, method} from 'lodash';
import {sharedReducers} from '../common/reducers';
import createAppInstance from './createAppInstance';
import createOptionsInstance from './createOptionsInstance';



/**
 *
 */
export default function createInstancePool() {
	const sharedStore = createStore(combineReducers(sharedReducers));
	const instances = {};
	let optionsInstance;

	//
	const create = (id) => {
		const instance = createAppInstance(id, sharedStore);
		instances[id] = instance;
		return instance;
	};

	// deregisters the popup id and returns the original tab id.
	const switchToTab = (popupId) => {
		const instance = instances[popupId];
		const tabId = instance.removePopup();
		instances[tabId] = instance;
		delete instances[popupId];
	};

	// Registers the popup id on which the instance runs.
	const switchToPopup = (tabId, popupId) => {
		const instance = instances[tabId];
		instance.setPopup(popupId);
		instances[popupId] = instance;
		delete instances[tabId];
	};

	// Registers the popup id on which the instance runs.
	const getOptionsInstance = () => {
		if (!optionsInstance) {
			optionsInstance = createOptionsInstance(sharedStore);
		}

		return optionsInstance;
	};

	//
	const dispatch = (action) =>
		forEach(instances, method('dispatch', action));

	return {
		create,
		switchToPopup,
		switchToTab,
		getOptionsInstance,
		dispatch,
		hasInstance: has.bind(null, instances),
		getInstance: get.bind(null, instances),
		removeInstance: remove.bind(null, instances)
	};
}
