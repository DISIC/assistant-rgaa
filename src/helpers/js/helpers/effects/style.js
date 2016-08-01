/**
 *
 */
export const inject = (document, id, style) => {
	const element = document.createElement('style');
	element.setAttribute('id', id);
	element.setAttribute('type', 'text/css');
	element.appendChild(document.createTextNode(style));

	document.head.appendChild(element);
};

/**
 *
 */
export const remove = (document, id) => {
	const element = document.getElementById(id);
	element.parentNode.removeChild(element);
};
