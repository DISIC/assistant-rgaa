import {isEmpty} from 'lodash';
import {api} from '../../common/api/extension';
import {INVALID_RESPONSE} from '../actions/runtime';



/**
 *
 */
const sendMessageApi = api('runtime.sendMessage');

/**
 *
 */
export const sendMessage = async (message, options = {}) => {
	const response = sendMessageApi(message, options);

	if (response === INVALID_RESPONSE) {
		throw new Error(response);
	}

	return response;
};

/**
 *
 */
export const createMessageHandler = (handler) =>
	// eslint-disable-next-line consistent-return
	(message, sender, sendResponse) => {
		const response = handler(message, sender);

		if (response instanceof Promise) {
			response.then(sendResponse);
			return true;
		} else if (!isEmpty(response)) {
			sendResponse(response);
		}
	};
