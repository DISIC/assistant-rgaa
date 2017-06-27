import React, {PropTypes} from 'react';
import {FormattedMessage, intlShape, injectIntl} from 'react-intl';
import {Link} from 'react-router';
import renderIf from 'render-if';
import DockMenuContainer from './DockMenuContainer';
import Icon from './Icon';



/**
 *
 */
const Header = ({
	referenceVersion, inPopup, title, intl,
	onOptionsClick, onCloseClick, onClosePopupClick, onMinimizeClick
}) => (
	<header className="Header">
		<h1 className="Header-title">
			{renderIf(inPopup)(() => `${title} | `)}
			RGAA v{referenceVersion}
		</h1>

		<div className="Header-actions">
			<Link className="Header-themes Link" to="/">
				<FormattedMessage id="Header.themes" />
			</Link>

			<Link className="Header-help Link" to="/help">
				<FormattedMessage id="Header.help" />
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

			{renderIf(!inPopup)(() =>
				<button
					type="button"
					onClick={onMinimizeClick}
					className="Header-minimize InvisibleButton"
					title={intl.formatMessage({id: 'Header.minimize'})}
				>
					<Icon
						name="window-minimize"
						title={intl.formatMessage({id: 'Header.minimize'})}
					/>
				</button>
			)}

			{renderIf(!inPopup)(() =>
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
			)}

			{renderIf(inPopup)(() =>
				<button
					type="button"
					onClick={onClosePopupClick}
					className="Header-closePopup InvisibleButton"
					title={intl.formatMessage({id: 'Header.closePopup'})}
				>
					<Icon
						name="sidebar"
						title={intl.formatMessage({id: 'Header.closePopup'})}
					/>
				</button>
			)}
		</div>
	</header>
);

Header.propTypes = {
	referenceVersion: PropTypes.string,
	title: PropTypes.string,
	inPopup: PropTypes.bool,
	onOptionsClick: PropTypes.func.isRequired,
	onCloseClick: PropTypes.func.isRequired,
	onClosePopupClick: PropTypes.func.isRequired,
	onMinimizeClick: PropTypes.func.isRequired,
	intl: intlShape
};

export default injectIntl(Header);
