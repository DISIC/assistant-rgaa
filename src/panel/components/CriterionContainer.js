import {connect} from 'react-redux';
import Criterion from './Criterion';
import {isCriterionInactive} from '../../common/selectors/imports';
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
		isDone: areAllTestsDone(state, tests)
	};
};



export default connect(mapStateToProps)(Criterion);
