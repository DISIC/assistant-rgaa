import colorString from 'color-string';
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

	return sendMessage({
		type: GET_PIXEL,
		x: rect.left,
		y: rect.top
	}).then((backgroundColor) => ({
		backgroundColor,
		fontSize: style.getPropertyValue('font-size'),
		fontWeight: style.getPropertyValue('font-weight'),
		color: colorString.to.hex(
			colorString.get.rgb(
				style.getPropertyValue('color')
			)
		)
	}));
}
