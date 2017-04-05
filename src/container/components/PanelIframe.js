import React from 'react';
import {IFRAME_FILE, CONTAINER_ID} from '../api/container';



/**
 *
 */
export default function PanelIframe() {
	const IFRAME_SRC = chrome.runtime.getURL(IFRAME_FILE);

	return (
		<iframe
			src={IFRAME_SRC}
			className={`${CONTAINER_ID}-panel`}
			style={{
				display: 'block'
			}}
		/>
	);
}
