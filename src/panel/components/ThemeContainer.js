import {connect} from 'react-redux';
import {get} from 'lodash';
import Theme from './Theme';
import {setCurrentCriterion} from '../../common/actions/reference';
import {getCriterion} from '../../common/api/reference';
import {
	getCurrent, getCurrentTheme, getCurrentCriterion
} from '../../common/selectors/reference';
import {isThemeInactive} from '../../common/selectors/imports';



/**
 *
 */
const mapStateToProps = (state) => ({
	currentReference: getCurrent(state),
	currentTheme: getCurrentTheme(state),
	currentCriterion: getCurrentCriterion(state),
	isInactive: isThemeInactive(state, get(getCurrentTheme(state), 'id', null))
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
