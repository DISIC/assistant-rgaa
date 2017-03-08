import {connect} from 'react-redux';
import {compose, withState} from 'recompose';
import {isTestDone} from '../../common/selectors/checklist';
import {isEnabled} from '../../common/selectors/tests';
import {getInstructionsByTest} from '../../common/selectors/instructions';
import {testHasHelpers} from '../../common/selectors/helpers';
import {getOneTestResult} from '../../common/selectors/imports';
import {enable, disable} from '../../common/actions/tests';
import {setTestDone} from '../../common/actions/checklist';
import Test from './Test';



/**
 *
 */
const mapStateToProps = (state, {id}) => ({
	done: isTestDone(state, id),
	applicable: testHasHelpers(state, id),
	applied: isEnabled(state, id),
	instructions: getInstructionsByTest(state, id),
	importResult: getOneTestResult(state, id)
});

/**
 *
 */
const mapDispatchToProps = (dispatch, {id}) => ({
	onApply(applied) {
		dispatch(applied ? enable(id) : disable(id));
	},
	onDone(done) {
		dispatch(setTestDone(id, done));
	}
});



export default compose(
	connect(
		mapStateToProps,
		mapDispatchToProps
	),
	withState(
		'areInstructionsOpen',
		'toggleInstructions',
		(props) => (props.applied)
	)
)(Test);
