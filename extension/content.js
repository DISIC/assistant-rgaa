'use strict';



/**
 *	Creates an iframe to run the app in.
 */
function startContainer() {
	var src = chrome.runtime.getURL('extension/index.html');
	var container = document.createElement('iframe');

	container.setAttribute('src', src);
	container.id = 'rgaat-Frame';
	container.style.position = 'fixed';
	container.style.top = '0';
	container.style.right = '0';
	container.style.bottom = '0';
	container.style.border = '0';
	container.style.width = '33%';
	container.style.height = '100%';
	container.style.background = '#fff';
	container.style['z-index'] = '999999';

	document.body.appendChild(container);
}

/**
 *	Listens to events from the background script.
 */
if (window.parent == window) {
	chrome.runtime.onMessage.addListener(function(message) {
		switch (message) {
			case 'SETUP_CONTAINER':
				startContainer();
				break;
		}
	});
}
