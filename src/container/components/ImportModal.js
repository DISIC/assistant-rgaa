import React, {PropTypes} from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';
import Modal from 'react-modal';



/**
 *
 */
function ImportModal({open, onClose, onFileSelection}) {
	const preventDefault = (event) =>
		event.preventDefault();

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
				<form onSubmit={preventDefault}>
					<label htmlFor="rgaaExt-ImportModal-fileInput">
						<FormattedMessage id="Import.file.label" />
					</label>
					<input
						id="rgaaExt-ImportModal-fileInput"
						className="rgaaExt-ImportModal-fileInput"
						name="file"
						type="file"
						accept="text/xml"
						onChange={onFileChange}
					/>

					<button className="rgaaExt-ImportModal-button">
						<FormattedMessage id="Import.submit" />
					</button>
				</form>
			</div>
		</Modal>
	);
}

ImportModal.propTypes = {
	open: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onFileSelection: PropTypes.func.isRequired
};

export default injectIntl(ImportModal);
