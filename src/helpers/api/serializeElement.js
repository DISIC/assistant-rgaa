import $ from 'jquery';
import {lowerCase} from 'lodash';
import {serializeAttribute} from './showAttribute';



/**
 *
 */
export default function serializeElement(element, attributes, showMissing) {
	const name = lowerCase(element.get(0).tagName);
	const attributesString = attributes
		.map((attribute) => serializeAttribute(element, attribute, showMissing))
		.join(' ');

	return `&lt;${name} ${attributesString} /&gt;`;
}
