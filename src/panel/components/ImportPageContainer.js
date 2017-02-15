import {connect} from 'react-redux';
import {compose} from 'recompose';
import {property} from 'lodash';
import renderNothingUntil from '../../common/renderNothingUntil';
import {getCsv} from '../../common/api/imports';
import {
	isPending, getHumanReadableErrors, isValid, getVersion as getImportVersion
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
	errors: getHumanReadableErrors(state),
	importVersion: getImportVersion(state),
	globalVersion: getReferenceVersion(state)
});

/**
 *
 */
const mergeProps = (stateProps, {dispatch}, ownProps) => ({
	...stateProps,
	...ownProps,

	onReset() {
		dispatch(reset());
	},

	onFileSelection(content) {
		dispatch(setPending(true));
		getCsv(content).then(({data, errors}) => {
			if (errors.length) {
				return dispatch(setErrors(errors));
			}
			return errors.length
				? dispatch(setErrors(errors))
				: dispatch(setContent(data));
		});
	},

	onSubmit() {
		if (stateProps.valid) {
			dispatch(apply());
		}
	}
});



export default compose(
	connect(
		mapStateToProps,
		null,
		mergeProps
	),
	renderNothingUntil(property('globalVersion'))
)(ImportPage);
