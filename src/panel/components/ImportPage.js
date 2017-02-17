import React, {PropTypes} from 'react';
import {FormattedMessage} from 'react-intl';
import renderIf from 'render-if';
import ImportFormContainer from './ImportFormContainer';



/**
 *
 */
function ImportPage({isImportActive, onReset}) {
	return (
		<div className="ImportPage">
			<h1 className="ImportPage-title Title">
				<FormattedMessage id="Import.title" />
			</h1>

			<div className="ImportPage-content">
				{renderIf(!isImportActive)(() =>
					<ImportFormContainer />
				)}
				{renderIf(isImportActive)(() =>
					<button type="button" onClick={onReset} className="ImportPage-singleResetButton">
						<FormattedMessage id="Import.singleReset" />
					</button>
				)}
			</div>
		</div>
	);
}

ImportPage.propTypes = {
	isImportActive: PropTypes.bool.isRequired,
	onReset: PropTypes.func.isRequired
};

export default ImportPage;
