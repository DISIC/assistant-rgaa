import $ from 'jquery';
import {forEach} from 'lodash';
import {createMessageHandler, sendMessage} from '../../common/api/runtime';
import {GET_PIXEL} from '../../common/actions/runtime';
import {mutedAttributeSelector, muteAttribute, restoreAttribute} from '../api/muteAttributes';
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
const startPicking = (state) => {
	setPickingState(state);
	muteAttribute($('a'), 'href');
};

/**
 *
 */
const stopPicking = () => {
	const selector = mutedAttributeSelector('href', 'a');

	setPickingState(null);
	restoreAttribute($(selector), 'href');
};

/**
 *
 */
const handleMessage = createMessageHandler(({type}) => {
	// eslint-disable-next-line default-case
	switch (type) {
		case REQUEST_PIXEL_COLOR:
			startPicking(PickingStates.pickingPixel);

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
				.then(stopPicking)
				.catch(stopPicking);
			break;

		case REQUEST_TEXT_COLOR:
			startPicking(PickingStates.pickingText);

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
				.then(stopPicking)
				.catch(stopPicking);
			break;

		case REQUEST_STYLE:
			startPicking(PickingStates.pickingText);

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
				.then(stopPicking)
				.catch(stopPicking);
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
