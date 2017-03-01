export const UA = window.navigator.userAgent;

export const isFirefox = (ua = UA) =>
	ua.indexOf('Firefox') !== -1;

export const isChrome = (ua = UA) =>
	ua.indexOf('Chrome') !== -1;
