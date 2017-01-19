import {compose} from 'recompose';
import {connect} from 'react-redux';
import {get, property} from 'lodash';
import Theme from './Theme';
import renderNothingUntil from '../../common/renderNothingUntil';
import * as criteriaActions from '../../common/actions/criteria';
import * as themes from '../../common/selectors/themes';
import * as criteria from '../../common/selectors/criteria';
import {isThemeInactive} from '../../common/selectors/imports';



/**
 *
 */
const mapStateToProps = (state) => {
	const theme = themes.getCurrent(state);
	const themeId = get(theme, 'id', null);

	return {
		theme,
		criteria: criteria.getAllByTheme(state, themeId),
		currentCriterion: criteria.getCurrent(state),
		isInactive: isThemeInactive(state, themeId)
	};
};

/**
 *
 */
const mapDispatchToProps = (dispatch) => ({
	onCriterionSelect(criterionId) {
		dispatch(criteriaActions.setCurrent(criterionId));
	}
});



export default compose(
	connect(
		mapStateToProps,
		mapDispatchToProps
	),
	renderNothingUntil(property('theme'))
)(Theme);
