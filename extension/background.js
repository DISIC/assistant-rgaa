'use strict';



/**
 *	Asks the content script to load the app when the user clicks
 *	on the extension icon.
 */
chrome.browserAction.onClicked.addListener(function() {
	var query = {
		active: true,
		currentWindow: true
	};

	chrome.tabs.query(query, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, 'SETUP_CONTAINER');
	});
});
