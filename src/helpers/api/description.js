import {initial, last} from 'lodash';



/**
 *
 */
export const cond = (condition, okText, notOkText = '') =>
	(condition ? okText : notOkText);

/**
 *
 */
export const join = (parts, separator = ', ', lastSeparator = ' et ') => {
	if (parts.length < 3) {
		return parts.join(lastSeparator);
	}

	return initial(parts).join(separator)
		+ lastSeparator
		+ last(parts);
};

/**
 *
 */
export const list = (...parts) => {
	const validParts = parts
		.map((part) => part.trim())
		.filter((part) => !!part);

	return join(validParts);
};
