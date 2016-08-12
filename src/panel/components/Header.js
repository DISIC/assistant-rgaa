import React, {PropTypes} from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';
import DockMenuContainer from './DockMenuContainer';



/**
 *
 */
function Header({
	isImportActive, referenceVersion, onOptionsClick, onStartImportClick, onResetImportClick
}) {
	const onImportButtonClick = isImportActive
		? onResetImportClick
		: onStartImportClick;
	const importButtonText = isImportActive
		? 'Header.import.reset'
		: 'Header.import.start';

	return (
		<header className="Header">
			<h1 className="Header-title">
				RGAA v{referenceVersion}
			</h1>

			<div className="Header-actions">
				<DockMenuContainer />

				<button
					type="button"
					onClick={onImportButtonClick}
					className="Link"
				>
					<FormattedMessage id={importButtonText} />
				</button>

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
}

Header.propTypes = {
	isImportActive: PropTypes.bool.isRequired,
	onOptionsClick: PropTypes.func.isRequired,
	onStartImportClick: PropTypes.func.isRequired,
	onResetImportClick: PropTypes.func.isRequired,
	referenceVersion: PropTypes.string
};

export default injectIntl(Header);
