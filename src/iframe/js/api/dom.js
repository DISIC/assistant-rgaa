/*
 *
 */
export const hide = (element) => {
	if (!element) {
		return false;
	}
	element.style.display = 'none'; // eslint-disable-line no-param-reassign
	return element;
};

/*
 *
 */
export const show = (element) => {
	if (!element) {
		return false;
	}
	element.style.display = 'block'; // eslint-disable-line no-param-reassign
	return element;
};
