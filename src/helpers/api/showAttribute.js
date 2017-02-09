import $ from 'jquery';
import serializeAttribute from './serializeAttribute';
import showCodeNearElement from './showCodeNearElement';



/**
 *	Shows a box containing an attribute's name and value on
 *	the given element.
 *
 *	@param {string} id - UUID.
 *	@param {$} element - Element.
 *	@param {string} attribute - Attribute name.
 *	@param {boolean} showMissing - Whether or not to show
 *		the attribute if it is not set.
 */
export default function showAttribute(id, element, attribute, showMissing) {
	const serialized = serializeAttribute(element, attribute, showMissing);

	if (serialized) {
		showCodeNearElement(
			element,
			$('<code />', {
				class: `${id} rgaaExt-Helper rgaaExt-ShowAttributeHelper`,
				html: serialized
			})
		);
	}
}
