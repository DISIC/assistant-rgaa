import {connect} from 'react-redux';
import {compose} from 'recompose';
import {property} from 'lodash';
import renderNothingUntil from '../../common/renderNothingUntil';
import {validateImportContent} from '../../common/api/imports';
import {
	isPending, getErrors, isValid, getVersion as getImportVersion
} from '../../common/selectors/imports';
import {getVersion as getReferenceVersion} from '../../common/selectors/reference';
import {setErrors, setContent, setPending, apply, reset} from '../../common/actions/imports';
import ImportPage from './ImportPage';



/**
 *
 */
const mapStateToProps = (state) => ({
	pending: isPending(state),
	valid: isValid(state),
	errors: getErrors(state),
	importVersion: getImportVersion(state),
	globalVersion: getReferenceVersion(state)
});

/**
 *
 */
const mapDispatchToProps = (dispatch) => ({
	onReset() {
		dispatch(reset());
	},

	onFileSelection(content) {
		dispatch(setPending(true));
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
		}
	}
});



export default compose(
	connect(
		mapStateToProps,
		mapDispatchToProps
	),
	renderNothingUntil(property('globalVersion'))
)(ImportPage);
