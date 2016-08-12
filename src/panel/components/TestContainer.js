import {connect} from 'react-redux';
import {isTestDone} from '../../common/selectors/checklist';
import {isTestApplied} from '../../common/selectors/reference';
import {getInstructionsByTest} from '../../common/selectors/instructions';
import {testHasHelpers} from '../../common/selectors/helpers';
import {getOneTestResult} from '../../common/selectors/imports';
import {enableTest, disableTest} from '../../common/actions/reference';
import {setTestDone} from '../../common/actions/checklist';
import Test from './Test';



/**
 *
 */
const mapStateToProps = (state, {id}) => ({
	done: isTestDone(state, id),
	applicable: testHasHelpers(state, id),
	applied: isTestApplied(state, id),
	instructions: getInstructionsByTest(state, id),
	importResult: getOneTestResult(state, id)
});

/**
 *
 */
const mapDispatchToProps = (dispatch, {id}) => ({
	onApply(applied) {
		dispatch(applied ? enableTest(id) : disableTest(id));
	},
	onDone(done) {
		dispatch(setTestDone(id, done));
	}
});



export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Test);
