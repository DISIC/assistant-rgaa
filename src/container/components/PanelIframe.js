import React from 'react';
import {injectIntl, intlShape} from 'react-intl';
import {IFRAME_FILE, CONTAINER_ID} from '../api/container';



/**
 *
 */
function PanelIframe({intl}) {
	const IFRAME_SRC = chrome.runtime.getURL(IFRAME_FILE);

	return (
		<iframe
			src={IFRAME_SRC}
			className={`${CONTAINER_ID}-panel`}
			title={intl.formatMessage({
				id: 'PanelIframe.title'
			})}
			style={{
				display: 'block'
			}}
		/>
	);
}

PanelIframe.propTypes = {
	intl: intlShape.isRequired
};

export default injectIntl(PanelIframe);
