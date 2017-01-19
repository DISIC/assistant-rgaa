import {compose, withProps} from 'recompose';
import {connect} from 'react-redux';
import ReferenceSelect from './ReferenceSelect';
import {setReferenceVersion} from '../../common/actions/reference';
import {reset as resetImport} from '../../common/actions/imports';
import {getReferencesList} from '../../common/api/reference';
import {getCurrent} from '../../common/selectors/reference';



/**
 *
 */
const mapStateToProps = (state) => ({
	value: getCurrent(state).version
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
const mapDispatchToProps = (dispatch) => ({
	onChange(version) {
		dispatch(resetImport());
		dispatch(setReferenceVersion(version));
	}
});



export default compose(
	withProps(props),
	connect(mapStateToProps, mapDispatchToProps)
)(ReferenceSelect);
