import {createMessageHandler, sendMessage} from '../../common/api/runtime';
import waitForEvent from '../api/waitForEvent';
import getSelectionStyle from '../api/getSelectionStyle';
import {REQUEST_STYLE, UPDATE_STYLE} from './analyzeColorContrast/actions';
import ColorContrastWidgetContainer from './analyzeColorContrast/ColorContrastWidgetContainer';



/**
 *
 */
const handleMessage = createMessageHandler(({type}) => {
	switch (type) {
		case REQUEST_STYLE:
			waitForEvent('mouseup')
				.then(getSelectionStyle)
				.then((style) =>
					sendMessage({
						type: UPDATE_STYLE,
						style
					})
				);
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
