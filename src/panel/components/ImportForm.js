import React, {PropTypes} from 'react';
import {FormattedMessage, FormattedHTMLMessage} from 'react-intl';
import {partial} from 'lodash';
import renderIf from 'render-if';



/**
 *
 */
export default function ImportForm({
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

	const onTextChange = (name, event) =>
		onConfigChange(name, event.target.value);

	return (
		<form onSubmit={onFormSubmit}>
			<fieldset className="ImportForm-config">
				<legend>Configuration</legend>
				<div className="ImportForm-input">
					<label htmlFor="ImportForm-delimiterInput">
						<FormattedMessage id="Import.delimiter.label" />
					</label>
					<input
						id="ImportForm-delimiterInput"
						name="delimiter"
						type="text"
						onChange={partial(onTextChange, 'delimiter')}
						value={config.delimiter}
					/>
				</div>

				<div className="ImportForm-input">
					<label htmlFor="ImportForm-quoteInput">
						<FormattedMessage id="Import.quoteChar.label" />
					</label>
					<input
						id="ImportForm-quoteInput"
						name="quote"
						type="text"
						onChange={partial(onTextChange, 'quoteChar')}
						value={config.quoteChar}
					/>
				</div>
			</fieldset>

			<div className="ImportForm-file">
				<label htmlFor="ImportForm-fileInput">
					<FormattedMessage id="Import.file.label" />
				</label>
				{/* `value=""` is a dirty trick to allow selection of same file
				multiples times in a row... but this messes up the UI,
				not that great */}
				<input
					id="ImportForm-fileInput"
					className="ImportForm-fileInput"
					name="file"
					type="file"
					accept="application/json"
					onChange={onFileChange}
					value=""
				/>
			</div>

			{renderIf(valid)(() => (
				<p className="ImportForm-success">
					<FormattedMessage id="Import.success" />
				</p>
			))}
			{renderIf(valid && importVersion !== globalVersion)(() => (
				<p className="ImportForm-warning">
					<FormattedHTMLMessage
						id="Import.versionDifference"
						values={{
							version: importVersion
						}}
					/>
				</p>
			))}
			{renderIf(pending && !valid)(() => (
				<details className="ImportForm-failure" open={errors.length < 10}>
					<summary>
						<FormattedMessage id="Import.failure" />
					</summary>
					<ul className="ImportForm-errors">
						{errors.map((error, i) => (
							// eslint-disable-next-line react/no-array-index-key
							<li key={i}>{error}</li>
						))}
					</ul>
				</details>
			))}

			<div className="ImportForm-buttons">
				<button disabled={!valid} className="ImportForm-button">
					<FormattedMessage id="Import.submit" />
				</button>

				<button type="button" onClick={onReset} className="ImportForm-button">
					<FormattedMessage id="Import.reset" />
				</button>
			</div>
		</form>
	);
}

ImportForm.propTypes = {
	importVersion: PropTypes.string.isRequired,
	globalVersion: PropTypes.string.isRequired,
	onReset: PropTypes.func.isRequired,
	onFileSelection: PropTypes.func.isRequired,
	onConfigChange: PropTypes.func.isRequired,
	config: PropTypes.shape({
		delimiter: PropTypes.string,
		quoteChar: PropTypes.string
	}).isRequired,
	onSubmit: PropTypes.func.isRequired,
	errors: PropTypes.arrayOf(PropTypes.string).isRequired,
	valid: PropTypes.bool.isRequired,
	pending: PropTypes.bool.isRequired
};

ImportForm.defaultProps = {
};
