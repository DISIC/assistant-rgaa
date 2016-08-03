import {connect} from 'react-redux';
import {isTestApplied} from '../selectors/reference';
import {enableTest, disableTest} from '../actions/reference';
import Test from './Test';



/**
 *
 */
const mapStateToProps = (state, {id}) => ({
	applied: isTestApplied(state, id)
});

/**
 *
 */
const mapDispatchToProps = (dispatch, {id}) => ({
	onApply(applied) {
		dispatch(applied ? enableTest(id) : disableTest(id));
	}
});



export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Test);
