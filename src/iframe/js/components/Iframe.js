import React from 'react';
import {IFRAME_FILE, CONTAINER_ID} from '../api/iframe';



/**
 *
 */
export default function Iframe() {
	const IFRAME_SRC = chrome.runtime.getURL(IFRAME_FILE); // eslint-disable-line no-undef

	return (
		<iframe
			src={IFRAME_SRC}
			id={`${CONTAINER_ID}-panel`}
			style={{
				display: 'block'
			}}
		/>
	);
}
