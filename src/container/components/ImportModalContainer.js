import {connect} from 'react-redux';
import {
	isModalOpen, getErrors, isValid, getVersion as getImportVersion
} from '../../common/selectors/imports';
import {getVersion as getReferenceVersion} from '../../common/selectors/reference';
import {closeModal, setErrors, setContent, reset, apply} from '../../common/actions/imports';
import ImportModal from './ImportModal';
import {validateImportContent} from '../../common/api/imports';



/**
 *
 */
const mapStateToProps = (state) => ({
	open: isModalOpen(state),
	valid: isValid(state),
	errors: getErrors(state),
	importVersion: getImportVersion(state),
	globalVersion: getReferenceVersion(state)
});

/**
 *
 */
const mapDispatchToProps = (dispatch) => ({
	onClose() {
		dispatch(reset());
		dispatch(closeModal());
	},

	onFileSelection(content) {
		try {
			const data = JSON.parse(content);
			if (validateImportContent(data)) {
				dispatch(setContent(data));
			}
		} catch (e) {
			dispatch(setErrors(e.message));
		}
	},

	onSubmit(valid) {
		if (valid) {
			dispatch(apply());
			dispatch(closeModal());
		}
	}
});



export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ImportModal);
