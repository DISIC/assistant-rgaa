import {compose, withProps} from 'recompose';
import {connect} from 'react-redux';
import ReferenceSelect from './ReferenceSelect';
import {setReference} from '../../common/actions/reference';
import {getReferencesList, getReference} from '../../common/api/reference';
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
		dispatch(setReference(getReference(version)));
	}
});



export default compose(
	withProps(props),
	connect(mapStateToProps, mapDispatchToProps)
)(ReferenceSelect);
