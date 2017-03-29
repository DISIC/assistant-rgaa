import {forEach} from 'lodash';
import {createMessageHandler, sendMessage} from '../../common/api/runtime';
import {GET_PIXEL} from '../../common/actions/runtime';
import waitForEvent from '../api/waitForEvent';
import getSelectionStyle from '../api/getSelectionStyle';
import {REQUEST_PIXEL_COLOR, REQUEST_TEXT_COLOR, REQUEST_STYLE, UPDATE_COLOR, UPDATE_STYLE} from '../actions/colorContrast';
import ColorContrastContainer from '../components/ColorContrastContainer';



/**
 *
 */
const PickingStates = {
	pickingPixel: 'rgaaExt-ColorContrastHelper--pickingPixel',
	pickingText: 'rgaaExt-ColorContrastHelper--pickingText',
	processing: 'rgaaExt-ColorContrastHelper--processing'
};

/**
 *
 */
const setPickingState = (className) =>
	forEach(PickingStates, (c) => {
		document.body.classList.toggle(c, (c === className));
	});

/**
 *
 */
const handleMessage = createMessageHandler(({type}) => {
	// eslint-disable-next-line default-case
	switch (type) {
		case REQUEST_PIXEL_COLOR:
			setPickingState(PickingStates.pickingPixel);

			waitForEvent('click')
				.then(({clientX, clientY}) => {
					setPickingState(PickingStates.processing);

					return sendMessage({
						type: GET_PIXEL,
						x: clientX,
						y: clientY
					});
				})
				.then((color) =>
					sendMessage({
						type: UPDATE_COLOR,
						payload: color
					})
				)
				.then(() => setPickingState(null))
				.catch(() => setPickingState(null));
			break;

		case REQUEST_TEXT_COLOR:
			setPickingState(PickingStates.pickingText);

			waitForEvent('mouseup')
				.then(() => {
					setPickingState(PickingStates.processing);
					return getSelectionStyle();
				})
				.then(({color}) =>
					sendMessage({
						type: UPDATE_COLOR,
						payload: color
					})
				)
				.then(() => setPickingState(null))
				.catch(() => setPickingState(null));
			break;

		case REQUEST_STYLE:
			setPickingState(PickingStates.pickingText);

			waitForEvent('mouseup')
				.then(() => {
					setPickingState(PickingStates.processing);
					return getSelectionStyle();
				})
				.then((style) =>
					sendMessage({
						type: UPDATE_STYLE,
						payload: style
					})
				)
				.then(() => setPickingState(null))
				.catch(() => setPickingState(null));
			break;
	}
});

/**
 *
 */
export const component = () =>
	ColorContrastContainer;

/**
 *	Describes the helper.
 */
export const describe = (intl) =>
	intl.formatHTMLMessage({
		id: 'Helper.colorContrast'
	});

/**
 *
 */
export const apply = () => {
	chrome.runtime.onMessage.addListener(handleMessage);
};

/**
 *
 */
export const revert = () => {
	chrome.runtime.onMessage.removeListener(handleMessage);
};
