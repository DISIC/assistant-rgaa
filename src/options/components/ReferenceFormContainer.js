import {compose, withProps, withState} from 'recompose';
import {connect} from 'react-redux';
import {setReferenceVersion} from '../../common/actions/reference';
import {reset as resetImport} from '../../common/actions/imports';
import {getReferencesList, DEFAULT_VERSION} from '../../common/api/reference';
import {getVersion} from '../../common/selectors/reference';
import ReferenceForm from './ReferenceForm';



/**
 *
 */
const mapStateToProps = (state) => ({
	version: getVersion(state)
});

/**
 *
 */
const props = {
	options: getReferencesList().map(({version, name}) => ({
		value: version,
		name
	}))
};

/**
 *
 */
const mapDispatchToProps = (dispatch, {toggleSuccessMessage}) => ({
	onChange() {
		toggleSuccessMessage(false);
	},

	onSubmit(version) {
		dispatch(resetImport());
		dispatch(setReferenceVersion(version));
		toggleSuccessMessage(true);
	}
});



export default compose(
	withState('showSuccessMessage', 'toggleSuccessMessage', false),
	connect(mapStateToProps, mapDispatchToProps),
	withProps(props),
	withState('value', 'setValue', ({version}) => version || DEFAULT_VERSION),
)(ReferenceForm);
