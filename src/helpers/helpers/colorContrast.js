import {createMessageHandler, sendMessage} from '../../common/api/runtime';
import {GET_PIXEL} from '../../common/actions/runtime';
import waitForEvent from '../api/waitForEvent';
import getSelectionStyle from '../api/getSelectionStyle';
import {REQUEST_COLOR, UPDATE_COLOR, REQUEST_STYLE, UPDATE_STYLE} from '../actions/colorContrast';
import ColorContrastContainer from '../components/ColorContrastContainer';



/**
 *
 */
const setPicking = (picking) =>
	document.body.classList.toggle('rgaaExt-ColorContrastHelper--picking', picking);

/**
 *
 */
const handleMessage = createMessageHandler(({type}) => {
	switch (type) {
		case REQUEST_COLOR:
			setPicking(true);

			waitForEvent('click')
				.then(({clientX, clientY}) => {
					setPicking(false);
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
				);
			break;

		case REQUEST_STYLE:
			setPicking(true);

			waitForEvent('mouseup')
				.then(() => {
					setPicking(false);
					return getSelectionStyle();
				})
				.then((style) =>
					sendMessage({
						type: UPDATE_STYLE,
						payload: style
					})
				);
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
export const describe = () =>
	`Affiche un outil d'analyse des contrastes.`;

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
