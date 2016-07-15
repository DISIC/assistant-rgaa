'use strict';



var CONTAINER_ID = 'rgaat-Frame';

function containerElement() {
	return document.getElementById(CONTAINER_ID);
}

function isContainerCreated() {
	return containerElement() !== null;
}

function toggleContainerVisibility() {
	var container = containerElement();
	if (!container) {
		return false;
	}
	if (container.style.display && container.style.display !== 'none') {
		container.style.display = 'none';
		return true;
	}
	container.style.display = 'block';
	return true;
}

/**
 *	Creates an iframe to run the app in.
 */
function createContainer() {
	var src = chrome.runtime.getURL('extension/index.html');
	var container = document.createElement('iframe');

	container.setAttribute('src', src);
	container.id = CONTAINER_ID;

	document.body.appendChild(container);
}

/**
 *	Listens to events from the background script.
 */
if (window.parent == window) {
	chrome.runtime.onMessage.addListener(function(message) {
		switch (message) {
			case 'SETUP_CONTAINER':
				if (isContainerCreated()) {
					toggleContainerVisibility();
				} else {
					createContainer();
				}
				break;
		}
	});
}
