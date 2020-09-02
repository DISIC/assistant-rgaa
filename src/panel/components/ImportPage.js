import React, {PropTypes} from 'react';
import {FormattedMessage} from 'react-intl';
import renderIf from 'render-if';
import Page from './Page';
import ImportFormContainer from './ImportFormContainer';



/**
 *
 */
function ImportPage({isImportActive, onReset}) {
	return (
		<Page title={<FormattedMessage id="Import.title" />}>
			{renderIf(!isImportActive)(() =>
				<ImportFormContainer />
			)}
			{renderIf(isImportActive)(() => (
				<button type="button" onClick={onReset} className="ImportPage-singleResetButton">
					<FormattedMessage id="Import.singleReset" />
				</button>
			))}
		</Page>
	);
}

ImportPage.propTypes = {
	isImportActive: PropTypes.bool.isRequired,
	onReset: PropTypes.func.isRequired
};

export default ImportPage;
