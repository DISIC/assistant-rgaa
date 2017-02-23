import createColor from 'color';
import wait from '../../common/api/wait';
import {sendMessage} from '../../common/api/runtime';
import {GET_PIXEL} from '../../common/actions/runtime';



/**
 *
 */
export default function getSelectionStyle() {
	const selection = window.getSelection();
	const anchor = selection.anchorNode.parentElement;
	const style = window.getComputedStyle(anchor);
	const rect = selection
		.getRangeAt(0)
		.getBoundingClientRect();

	// cancels the selection so the color picker doesn't pick
	// the selection background color
	selection.removeAllRanges();

	// We're waiting a bit to ensure the selection is actually
	// removed before getting the background color.
	// Otherwise we could get the selection color instead of
	// the real background one.
	return wait(100)
		.then(() =>
			sendMessage({
				type: GET_PIXEL,
				x: rect.left,
				y: rect.top
			})
		)
		.then((backgroundColor) => ({
			backgroundColor,
			color: createColor(style.getPropertyValue('color')).hex().toString(),
			fontSize: style.getPropertyValue('font-size'),
			fontWeight: style.getPropertyValue('font-weight')
		}));
}
