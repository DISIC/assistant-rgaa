import {connect} from 'react-redux';
import Criterion from './Criterion';
import {toggleCriterion} from '../../common/actions/criteria';
import {isCriterionInactive} from '../../common/selectors/imports';
import {isOpen} from '../../common/selectors/criteria';
import {getAllByCriterion} from '../../common/selectors/tests';
import {areAllTestsDone} from '../../common/selectors/checklist';



/**
 *
 */
const mapStateToProps = (state, {id}) => {
	const tests = getAllByCriterion(state, id);

	return {
		tests,
		isInactive: isCriterionInactive(state, id),
		isOpen: isOpen(state, id),
		isDone: areAllTestsDone(state, tests)
	};
};

const mapDispatchToProps = (dispatch, {id}) => ({
	onToggle() {
		dispatch(toggleCriterion(id));
	}
});



export default connect(mapStateToProps, mapDispatchToProps)(Criterion);
