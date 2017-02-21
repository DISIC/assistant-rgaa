import React, {PropTypes} from 'react';
import {intlShape, injectIntl} from 'react-intl';



/**
 *
 */
const ExternalTool = ({name, url, intl}) => (
	<div className="ExternalTool">
		<a
			className="Button"
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			title={intl.formatMessage({
				id: 'ExternalTool.linkTitle'
			})}
		>
			{name}
		</a>
	</div>
);

ExternalTool.propTypes = {
	name: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	intl: intlShape
};

export default injectIntl(ExternalTool);
