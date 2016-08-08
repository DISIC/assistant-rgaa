import {connect} from 'react-redux';
import {isTestApplied} from '../../common/selectors/reference';
import {getInstructionsByTest} from '../../common/selectors/instructions';
import {enableTest, disableTest} from '../../common/actions/reference';
import Test from './Test';



/**
 *
 */
const mapStateToProps = (state, {id}) => ({
	applied: isTestApplied(state, id),
	instructions: getInstructionsByTest(state, id)
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
