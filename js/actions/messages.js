/**
 *
 */
export const SEND = 'messages/SEND';



/**
 *
 */
export const send = (type, payload) => ({
	type: SEND,
	payload: {
		type,
		payload
	}
});
