import {connect} from 'react-redux';
import {map} from 'lodash';
import Criterion from './Criterion';
import {isCriterionInactive} from '../../common/selectors/imports';
import {areAllTestsDone} from '../../common/selectors/checklist';


/**
 *
 */
const mapStateToProps = (state, {id, tests}) => ({
	isInactive: isCriterionInactive(state, id),
	isDone: areAllTestsDone(state, map(tests, 'id'))
});

/**
 *
 */
const mapDispatchToProps = () => ({
});



export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Criterion);
