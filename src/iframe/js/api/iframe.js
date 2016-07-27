import React from 'react';
import {render} from 'react-dom';
import App from '../components/App';



export const CONTAINER_ID = 'vt-RGAAToolbar';
export const IFRAME_FILE = 'src/iframe/content.html';

export const element = () =>
	document.getElementById(CONTAINER_ID);

export const isCreated = () =>
	element() !== null;

/**
 *	Creates a container so that the app can run on it when it wants.
 */
export const create = () => {
	const container = document.createElement('div');
	container.id = CONTAINER_ID;
	document.body.appendChild(container);
};

export const show = () => {
	const container = element();
	if (!container) {
		return false;
	}
	return render(<App />, container);
};

export const hide = () => {
	const container = element();
	if (!container) {
		return false;
	}
	return render(<App hidden />, container);
};

export const setPosition = (position) => {
	const container = element();
	if (!container) {
		return false;
	}
	return render(<App position={position} />, container);
};
