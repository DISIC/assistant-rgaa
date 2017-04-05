import React, {PropTypes} from 'react';
import {injectIntl, intlShape} from 'react-intl';



/**
 *
 */
function AppToggle({onClick, intl}) {
	return (
		<button
			type="button"
			className="AppToggle"
			onClick={onClick}
			title={intl.formatMessage({id: 'Panel.toggle'})}
		>
			<img
				src={chrome.extension.getURL('img/icon-48.png')}
				alt={intl.formatMessage({id: 'Panel.toggle'})}
			/>
		</button>
	);
}

AppToggle.propTypes = {
	onClick: PropTypes.func,
	intl: intlShape
};

export default injectIntl(AppToggle);
