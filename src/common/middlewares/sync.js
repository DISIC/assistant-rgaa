/**
 *
 */
const TYPE_REDUX_ACTION = 'TYPE_REDUX_ACTION';

/**
 *	Gathers actions from other stores and passes it down to
 *	the next middlewares.
 *	This should be the first middleware in the chain.
 */
export const gatherMiddleware = () => (next) => {
	chrome.runtime.onMessage.addListener((message) => {
		if (message.type === TYPE_REDUX_ACTION && message.action) {
			next({
				...message.action,
				gathered: true
			});
		}
	});

	return (action) => next(action);
};

/**
 *	Broadcasts actions to the other stores.
 *	This should be the last middleware in the chain.
 */
export const createBroadcastMiddleware = (send = chrome.runtime.sendMessage) =>
	() => (next) => (action) => {
		if (!action.gathered) {
			send({
				type: TYPE_REDUX_ACTION,
				action
			});
		}

		next(action);
	};
