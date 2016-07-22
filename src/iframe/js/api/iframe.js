import {show as showDOMElelement, hide as hideDOMElement} from './dom';



/**
 *
 */
const CONTAINER_ID = 'rgaat-Frame';
export const IFRAME_FILE = 'src/iframe/content.html';



export const element = () =>
	document.getElementById(CONTAINER_ID);

export const isCreated = () =>
	element() !== null;

export const isVisible = () => {
	const container = element();
	if (!container) {
		return false;
	}
	return (container.style.display && container.style.display !== 'none')
		|| !container.style.display;
};

export const toggleVisibility = () => {
	const container = element();
	if (!container) {
		return false;
	}
	return isVisible() ? hideDOMElement(container) : showDOMElelement(container);
};

export const show = () => {
	const container = element();
	if (!container) {
		return false;
	}
	return showDOMElelement(container);
};

export const hide = () => {
	const container = element();
	if (!container) {
		return false;
	}
	return hideDOMElement(container);
};

/**
 *	Creates an iframe to run the app in.
 */
export const create = () => {
	const src = chrome.runtime.getURL(IFRAME_FILE); // eslint-disable-line no-undef
	const container = document.createElement('iframe');

	container.setAttribute('src', src);
	container.id = CONTAINER_ID;
	container.style.display = 'block';

	document.body.appendChild(container);
};

export const setPosition = (position) => {
	const container = element();
	if (!container) {
		return false;
	}
	container.classList.remove(
		'rgaat-Frame--left', 'rgaat-Frame--right', 'rgaat-Frame--bottom'
	);
	return container.classList.add(`rgaat-Frame--${position}`);
};

