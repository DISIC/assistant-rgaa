import React, {PropTypes} from 'react';
import {FormattedMessage, FormattedHTMLMessage, injectIntl} from 'react-intl';
import Modal from 'react-modal';
import renderIf from 'render-if';



/**
 *
 */
function ImportModal({
	pending, valid, errors, open, importVersion, globalVersion, onClose, onFileSelection, onSubmit
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
		<Modal
			isOpen={open}
			onRequestClose={onClose}
			portalClassName="rgaaExt-ImportModal"
			className="rgaaExt-ImportModal-container"
			overlayClassName="rgaaExt-ImportModal-overlay"
		>
			<h1 className="rgaaExt-ImportModal-title">
				<FormattedMessage id="Import.title" />
			</h1>

			<div className="rgaaExt-ImportModal-content">
				<form onSubmit={onFormSubmit}>
					<label htmlFor="rgaaExt-ImportModal-fileInput">
						<FormattedMessage id="Import.file.label" />
					</label>
					{/* `value=""` is a dirty trick to allow selection of same file
					multiples times in a row... but this messes up the UI,
					not that great */}
					<input
						id="rgaaExt-ImportModal-fileInput"
						className="rgaaExt-ImportModal-fileInput"
						name="file"
						type="file"
						accept="application/json"
						onChange={onFileChange}
						value=""
					/>

					{renderIf(valid)(
						<p className="rgaaExt-ImportModal-success">
							<FormattedMessage id="Import.success" />
						</p>
					)}
					{renderIf(valid && importVersion !== globalVersion)(
						<p className="rgaaExt-ImportModal-warning">
							<FormattedHTMLMessage
								id="Import.versionDifference"
								values={{
									version: importVersion
								}}
							/>
						</p>
					)}
					{renderIf(pending && !valid)([
						(<p key="failure" className="rgaaExt-ImportModal-failure">
							<FormattedMessage id="Import.failure" />
						</p>),
						(<ul key="errors" className="rgaaExt-ImportModal-errors">
							{errors.split('\n').map((error, i) =>
								<li key={`error-${i}`}>{error}</li>
							)}
						</ul>)
					])}

					<div className="rgaaExt-ImportModal-buttons">
						<button disabled={!valid} className="rgaaExt-ImportModal-button">
							<FormattedMessage id="Import.submit" />
						</button>

						<button type="button" onClick={onClose} className="rgaaExt-ImportModal-button">
							<FormattedMessage id="Import.close" />
						</button>
					</div>
				</form>
			</div>
		</Modal>
	);
}

ImportModal.propTypes = {
	open: PropTypes.bool.isRequired,
	importVersion: PropTypes.string,
	globalVersion: PropTypes.string.isRequired,
	onClose: PropTypes.func.isRequired,
	onFileSelection: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	errors: PropTypes.string.isRequired,
	valid: PropTypes.bool.isRequired,
	pending: PropTypes.bool.isRequired
};

ImportModal.defaultProps = {
	importVersion: ''
};

export default injectIntl(ImportModal);
