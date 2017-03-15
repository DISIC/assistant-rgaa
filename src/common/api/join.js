import {initial, last} from 'lodash';



/**
 *
 */
export default function join(parts, separator = ', ', lastSeparator = ' et ') {
	if (parts.length < 3) {
		return parts.join(lastSeparator);
	}

	return initial(parts).join(separator)
		+ lastSeparator
		+ last(parts);
}
