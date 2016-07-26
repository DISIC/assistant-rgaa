import {connect} from 'react-redux';
import Criterion from './Criterion';



/**
 *
 */
const mapStateToProps = ({reference}) => ({
	currentCriterion: reference.criterion
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
