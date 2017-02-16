import React, {PropTypes} from 'react';
import {partial} from 'lodash';
import {FormattedMessage, FormattedHTMLMessage, injectIntl} from 'react-intl';
import renderIf from 'render-if';



/**
 *
 */
function ImportPage({
	pending, valid, errors, importVersion, globalVersion, config,
	onConfigChange, onReset, onFileSelection, onSubmit
}) {
	const onFormSubmit = (event) => {
		event.preventDefault();
		onSubmit();
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

	const onCheckboxChange = (name, event) =>
		onConfigChange(name, event.target.checked);

	const onTextChange = (name, event) =>
		onConfigChange(name, event.target.value);

	return (
		<div className="ImportPage">
			<h1 className="ImportPage-title Title">
				<FormattedMessage id="Import.title" />
			</h1>

			<div className="ImportPage-content">
				<form onSubmit={onFormSubmit}>
					<fieldset className="ImportPage-config">
						<legend>Configuration</legend>
						<div className="ImportPage-input">
							<label htmlFor="ImportPage-delimiterInput">
								<FormattedMessage id="Import.delimiter.label" />
							</label>
							<input
								id="ImportPage-delimiterInput"
								name="delimiter"
								type="text"
								onChange={partial(onTextChange, 'delimiter')}
								value={config.delimiter}
							/>
						</div>

						<div className="ImportPage-input">
							<label htmlFor="ImportPage-quoteInput">
								<FormattedMessage id="Import.quoteChar.label" />
							</label>
							<input
								id="ImportPage-quoteInput"
								name="quote"
								type="text"
								onChange={partial(onTextChange, 'quoteChar')}
								value={config.quoteChar}
							/>
						</div>

						<div className="ImportPage-input">
							<label htmlFor="ImportPage-headerInput">
								<FormattedMessage id="Import.header.label" />
							</label>
							<input
								id="ImportPage-headerInput"
								name="header"
								type="checkbox"
								onChange={partial(onCheckboxChange, 'header')}
								checked={config.header}
							/>
						</div>
					</fieldset>

					<div className="ImportPage-file">
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
					</div>

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
					{renderIf(pending && !valid)(
						<details className="ImportPage-failure" open={errors.length < 10}>
							<summary>
								<FormattedMessage id="Import.failure" />
							</summary>
							<ul className="ImportPage-errors">
								{errors.map((error, i) =>
									<li key={`error-${i}`}>{error}</li>
								)}
							</ul>
						</details>
					)}

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
	onConfigChange: PropTypes.func.isRequired,
	config: PropTypes.shape({
		delimiter: PropTypes.string,
		quoteChar: PropTypes.string,
		header: PropTypes.bool
	}).isRequired,
	onSubmit: PropTypes.func.isRequired,
	errors: PropTypes.array.isRequired,
	valid: PropTypes.bool.isRequired,
	pending: PropTypes.bool.isRequired
};

ImportPage.defaultProps = {
	importVersion: ''
};

export default injectIntl(ImportPage);
