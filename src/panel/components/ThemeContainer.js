import {connect} from 'react-redux';
import Theme from './Theme';
import {setCurrentCriterion} from '../../common/actions/reference';
import {getCriterion} from '../../common/api/reference';



/**
 *
 */
const mapStateToProps = ({reference}) => ({
	currentReference: reference.data,
	currentTheme: reference.theme,
	currentCriterion: reference.criterion
});

/**
 *
 */
const mapDispatchToProps = (dispatch) => ({
	onCriterionSelect(criterionId, reference) {
		dispatch(setCurrentCriterion(getCriterion(criterionId, reference)));
	}
});



export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Theme);
