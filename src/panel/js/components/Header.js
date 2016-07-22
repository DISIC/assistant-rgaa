import React, {PropTypes} from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';



/**
 *
 */
function Header({children}) {
	return (
		<header className="Header">
			<h1 className="Header-title">
				<FormattedMessage id="Header.title" />
			</h1>

			<div className="Header-actions">
				{children}
			</div>
		</header>
	);
}

Header.propTypes = {
	children: PropTypes.node
};

export default injectIntl(Header);
