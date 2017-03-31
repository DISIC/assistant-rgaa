import React, {PropTypes} from 'react';
import {FormattedMessage, intlShape, injectIntl} from 'react-intl';
import {Link} from 'react-router';
import renderIf from 'render-if';
import DockMenuContainer from './DockMenuContainer';
import Icon from './Icon';



/**
 *
 */
const Header = ({referenceVersion, inPopup, title, onOptionsClick, onCloseClick, intl}) => (
	<header className="Header">
		<h1 className="Header-title">
			{renderIf(inPopup)(() => `${title} | `)}
			RGAA v{referenceVersion}
		</h1>

		<div className="Header-actions">
			<Link className="Header-themes Link" to="/">
				<FormattedMessage id="Header.themes" />
			</Link>

			<Link className="Header-import Link" to="/import">
				<FormattedMessage id="Header.import" />
			</Link>

			<div className="Header-dock">
				<DockMenuContainer />
			</div>

			<button
				type="button"
				onClick={onOptionsClick}
				className="Header-options Link"
				title={intl.formatMessage({id: 'Header.options'})}
			>
				<Icon
					name="cog"
					title={intl.formatMessage({id: 'Header.options'})}
				/>
			</button>

			<Link
				className="Header-help Link"
				title={intl.formatMessage({id: 'Header.help'})}
				to="/help"
			>
				<Icon
					name="question-circle-o"
					title={intl.formatMessage({id: 'Header.help'})}
				/>
			</Link>

			<button
				type="button"
				onClick={onCloseClick}
				className="Header-close InvisibleButton"
				title={intl.formatMessage({id: 'Header.close'})}
			>
				<Icon
					name="close"
					title={intl.formatMessage({id: 'Header.close'})}
				/>
			</button>
		</div>
	</header>
);

Header.propTypes = {
	referenceVersion: PropTypes.string,
	title: PropTypes.string,
	inPopup: PropTypes.bool,
	onOptionsClick: PropTypes.func.isRequired,
	onCloseClick: PropTypes.func.isRequired,
	intl: intlShape
};

export default injectIntl(Header);
