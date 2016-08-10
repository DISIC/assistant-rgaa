import {connect} from 'react-redux';
import Criterion from './Criterion';
import {isCriterionInactive} from '../../common/selectors/reference';


/**
 *
 */
const mapStateToProps = (state, {id}) => ({
	isInactive: isCriterionInactive(state, id)
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
