'use strict';

/**
 * 	the background script is tasked with:
 * 		- sending the "toggle panel" request on the extension icon click
 * 		- dispatching messages across the whole extension
 */

var currentTabId = null;
var popup = null;

/**
 *	Asks the content script to toggle the extension's container
 *	when we click the extension icon in browser UI
 */
chrome.browserAction.onClicked.addListener(function() {
	getCurrentTab(function(tab) {
		currentTabId = tab;

		sendMessageToTab(currentTabId, {
			type: 'browser/TOGGLE_CONTAINER',
			payload: {}
		});
	});
});

/**
 *	every message received by the background-script
 *	is dispatched to content-scripts
 */
chrome.runtime.onMessage.addListener(function(message) {
	sendMessageToTab(currentTabId, message);

	if (message.type && message.type == 'dock/TOGGLE_POPUP') {
		if (popup && popup.id) {
			sendMessageToTab(currentTabId, {
				type: 'dock/SET_POPUP',
				payload: {
					popup: false
				}
			});
			chrome.windows.remove(popup.id);
			popup = null;
			return true;
		}

		sendMessageToTab(currentTabId, {
			type: 'dock/SET_POPUP',
			payload: {
				popup: true
			}
		});
		chrome.windows.create({
			url: chrome.runtime.getURL('extension/panel.html'),
			type: 'popup'
		}, function onCreated(window) {
			popup = window;
		});
	}
});



function getCurrentTab(callback) {
	var query = {
		active: true,
		currentWindow: true
	};

	chrome.tabs.query(query, function(tabs) {
		callback(tabs[0].id);
	});
}

function sendMessageToTab(tab, message) {
	if (!tab) {
		return false;
	}
	chrome.tabs.sendMessage(tab, message);
}
