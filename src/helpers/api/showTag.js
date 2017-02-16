import $ from 'jquery';
import {lowerCase} from 'lodash';
import showCodeNearElement from './showCodeNearElement';



/**
 *	Shows a box containing a tag's name on the given element.
 *
 *	@param {string} id - UUID.
 *	@param {$} element - Element.
 */
export default function showTag(id, element) {
	showCodeNearElement(
		element,
		$('<code />', {
			class: `${id} rgaaExt-Helper rgaaExt-ShowTagHelper`,
			html: `${lowerCase(element.get(0).tagName)}`
		})
	);
}
