import {find} from 'lodash';
import {connect} from 'react-redux';
import Criterion from './Criterion';
import {toggleCriterion} from '../../common/actions/criteria';
import {isOpen} from '../../common/selectors/criteria';
import {getAllTestsByCriterion} from '../../common/selectors/reference';
import {getOneCriterionResults} from '../../common/selectors/imports';
import {getEnabledForCriterion} from '../../common/selectors/tests';
import {areAllTestsDone} from '../../common/selectors/checklist';
import {setTestDone} from '../../common/actions/checklist';



/**
 *
 */
const mapStateToProps = (state, {id}) => {
	const tests = getAllTestsByCriterion(state, id);
	const open = isOpen(state, id);
	// get enabled test only when the criterion is closed
	const enabledTests = !open
		? getEnabledForCriterion(state, id)
		: null;
	const enabledTest = enabledTests && enabledTests.length
		? enabledTests[0]
		: null;
	return {
		tests,
		activeTest: enabledTest,
		isOpen: open,
		isDone: areAllTestsDone(state, tests),
		importResults: getOneCriterionResults(state, id)
	};
};

/**
 *
 */
const mergeProps = (stateProps, {dispatch}, ownProps) => ({
	...ownProps,
	...stateProps,
	onToggle(event) {
		event.stopPropagation();
		dispatch(toggleCriterion(ownProps.id));
	},
	onDone(done) {
		stateProps.tests.forEach(({id}) =>
			dispatch(setTestDone(id, done))
		);
	}
});



export default connect(mapStateToProps, null, mergeProps)(Criterion);
