import $ from 'jquery';
import serializeElement from './serializeElement';



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
export default function showChildren(id, element, childrenSelector, attributes, showMissing) {
	element
		.find(childrenSelector)
		.each((i, child) =>
			element.after(
				$('<code />', {
					class: `${id} rgaaExt-Helper rgaaExt-SerializeChildrenHelper`,
					html: serializeElement($(child), attributes, showMissing)
				})
			)
		);
}
