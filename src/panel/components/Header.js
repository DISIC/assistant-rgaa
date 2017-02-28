import React, {PropTypes} from 'react';
import {truncate} from 'lodash';
import {FormattedMessage, injectIntl} from 'react-intl';
import {Link} from 'react-router';
import renderIf from 'render-if';
import DockMenuContainer from './DockMenuContainer';



/**
 *
 */
const Header = ({referenceVersion, inPopup, title, onOptionsClick}) => (
	<header className="Header">
		<h1 className="Header-title">
			{renderIf(inPopup)(() => `${title} | `)}
			RGAA v{referenceVersion}
		</h1>

		<div className="Header-actions">
			<Link className="Link" to="/">
				<FormattedMessage id="Header.themes" />
			</Link>

			<Link className="Link" to="/import">
				<FormattedMessage id="Header.import" />
			</Link>

			<DockMenuContainer />

			<button
				type="button"
				onClick={onOptionsClick}
				className="Link"
			>
				<FormattedMessage id="Header.options" />
			</button>
		</div>
	</header>
);

Header.propTypes = {
	referenceVersion: PropTypes.string,
	title: PropTypes.string,
	inPopup: PropTypes.bool,
	onOptionsClick: PropTypes.func.isRequired
};

export default injectIntl(Header);
