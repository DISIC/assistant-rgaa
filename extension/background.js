'use strict';

/**
 * 	the background script is tasked with:
 * 		- sending the "toggle panel" request on the extension icon click
 * 		- dispatching messages across the whole extension
 */



/**
 *	Asks the content script to toggle the extension's container
 *	when we click the extension icon in browser UI
 */
chrome.browserAction.onClicked.addListener(function() {
	sendMessageToTab({
		type: 'browser/TOGGLE_CONTAINER',
		payload: {}
	});
});

/**
 *	every message received by the background-script
 *	is dispatched to content-scripts
 */
chrome.runtime.onMessage.addListener(function(message) {
	sendMessageToTab(message);
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

function sendMessageToTab(message) {
	getCurrentTab(function(tab) {
		chrome.tabs.sendMessage(tab, message);
	});
}
