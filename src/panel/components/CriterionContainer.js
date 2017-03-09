import {connect} from 'react-redux';
import Criterion from './Criterion';
import {toggleCriterion} from '../../common/actions/criteria';
import {isOpen} from '../../common/selectors/criteria';
import {getAllTestsByCriterion} from '../../common/selectors/reference';
import {getOneCriterionResults} from '../../common/selectors/imports';
import {areAllTestsDone} from '../../common/selectors/checklist';
import {setTestDone} from '../../common/actions/checklist';



/**
 *
 */
const mapStateToProps = (state, {id}) => {
	const tests = getAllTestsByCriterion(state, id);

	return {
		tests,
		isOpen: isOpen(state, id),
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
	onToggle() {
		dispatch(toggleCriterion(ownProps.id));
	},
	onDone(done) {
		stateProps.tests.forEach(({id}) =>
			dispatch(setTestDone(id, done))
		);
	}
});



export default connect(mapStateToProps, null, mergeProps)(Criterion);
