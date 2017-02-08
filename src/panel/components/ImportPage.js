import React, {PropTypes} from 'react';
import {FormattedMessage, FormattedHTMLMessage, injectIntl} from 'react-intl';
import renderIf from 'render-if';



/**
 *
 */
function ImportPage({
	pending, valid, errors, importVersion, globalVersion, onReset, onFileSelection, onSubmit
}) {
	const onFormSubmit = (event) => {
		event.preventDefault();
		onSubmit(valid);
	};

	const onFileChange = (event) => {
		if (!event.target.files || !event.target.files.length) {
			return;
		}
		const reader = new FileReader();
		reader.onloadend = () => {
			onFileSelection(reader.result);
		};
		reader.readAsText(event.target.files[0]);
	};

	return (
		<div>
			<h1 className="ImportPage-title Title">
				<FormattedMessage id="Import.title" />
			</h1>

			<div className="ImportPage-content">
				<form onSubmit={onFormSubmit}>
					<label htmlFor="ImportPage-fileInput">
						<FormattedMessage id="Import.file.label" />
					</label>
					{/* `value=""` is a dirty trick to allow selection of same file
					multiples times in a row... but this messes up the UI,
					not that great */}
					<input
						id="ImportPage-fileInput"
						className="ImportPage-fileInput"
						name="file"
						type="file"
						accept="application/json"
						onChange={onFileChange}
						value=""
					/>

					{renderIf(valid)(
						<p className="ImportPage-success">
							<FormattedMessage id="Import.success" />
						</p>
					)}
					{renderIf(valid && importVersion !== globalVersion)(
						<p className="ImportPage-warning">
							<FormattedHTMLMessage
								id="Import.versionDifference"
								values={{
									version: importVersion
								}}
							/>
						</p>
					)}
					{renderIf(pending && !valid)([
						(<p key="failure" className="ImportPage-failure">
							<FormattedMessage id="Import.failure" />
						</p>),
						(<ul key="errors" className="ImportPage-errors">
							{errors.split('\n').map((error, i) =>
								<li key={`error-${i}`}>{error}</li>
							)}
						</ul>)
					])}

					<div className="ImportPage-buttons">
						<button disabled={!valid} className="ImportPage-button">
							<FormattedMessage id="Import.submit" />
						</button>

						<button type="button" onClick={onReset} className="ImportPage-button">
							<FormattedMessage id="Import.reset" />
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

ImportPage.propTypes = {
	importVersion: PropTypes.string,
	globalVersion: PropTypes.string.isRequired,
	onReset: PropTypes.func.isRequired,
	onFileSelection: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	errors: PropTypes.string.isRequired,
	valid: PropTypes.bool.isRequired,
	pending: PropTypes.bool.isRequired
};

ImportPage.defaultProps = {
	importVersion: ''
};

export default injectIntl(ImportPage);
