import {createMessageHandler, sendMessage} from '../../common/api/runtime';
import waitForEvent from '../api/waitForEvent';
import getSelectionStyle from '../api/getSelectionStyle';
import {REQUEST_STYLE, UPDATE_STYLE} from '../actions/colorContrast';
import ColorContrastWidgetContainer from '../components/ColorContrastWidgetContainer';



/**
 *
 */
const handleMessage = createMessageHandler(({type}) => {
	switch (type) {
		case REQUEST_STYLE:
			document.body.classList.add('rgaaExt-ColorContrastHelper--picking');

			waitForEvent('mouseup')
				.then(getSelectionStyle)
				.then((style) => {
					document.body.classList.remove('rgaaExt-ColorContrastHelper--picking');

					sendMessage({
						type: UPDATE_STYLE,
						style
					});
				});
			break;
	}
});

/**
 *
 */
export const component = () =>
	ColorContrastWidgetContainer;

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
