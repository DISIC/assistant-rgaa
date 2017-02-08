import chromeStorage from './storage';



/**
 *
 */
export const getOption = (key) =>
	chromeStorage.getItem('options').then((options) =>
		(key ? options[key] : options)
	);

/**
 *
 */
export const setOption = (key, value) =>
	chromeStorage.getItem('options').then((options) =>
		chromeStorage.setItem('options', {
			...options,
			[key]: value
		})
	);
