'use strict';

/**
 *	handles all iframe-specific code:
 *		- show/hide the extension container (create it on the fly if necessary)
 *		- move around the container on the page
 */



if (window.parent == window) {
	chrome.runtime.onMessage.addListener(function(message) {
		if (!message.type) {
			return false;
		}
		switch (message.type) {
			case 'browser/TOGGLE_CONTAINER':
				if (isContainerCreated()) {
					toggleContainerVisibility();
				} else {
					createContainer();
				}
				break;

			case 'dock/SET_POSITION':
				setPositionClass(containerElement(), message.payload.position);
				break;

			default:
				break;
		}
	});
}


var CONTAINER_ID = 'rgaat-Frame';
var IFRAME_FILE = 'extension/panel.html';

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
	var src = chrome.runtime.getURL(IFRAME_FILE);
	var container = document.createElement('iframe');

	container.setAttribute('src', src);
	container.id = CONTAINER_ID;
	container.style.display = 'block';

	document.body.appendChild(container);
}

function setPositionClass(container, position) {
	container.classList.remove(
		'rgaat-Frame--left', 'rgaat-Frame--right', 'rgaat-Frame--bottom', 'rgaat-Frame--external'
	);
	container.classList.add('rgaat-Frame--' + position);
}
