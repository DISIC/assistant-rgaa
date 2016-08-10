import {connect} from 'react-redux';
import Theme from './Theme';
import {setCurrentCriterion} from '../../common/actions/reference';
import {getCriterion} from '../../common/api/reference';
import {
	getCurrent, getCurrentTheme, getCurrentCriterion, isCurrentThemeInactive
} from '../../common/selectors/reference';



/**
 *
 */
const mapStateToProps = (state) => ({
	currentReference: getCurrent(state),
	currentTheme: getCurrentTheme(state),
	currentCriterion: getCurrentCriterion(state),
	isInactive: isCurrentThemeInactive(state)
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
