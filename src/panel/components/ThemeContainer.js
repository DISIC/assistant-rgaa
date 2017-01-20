import {compose} from 'recompose';
import {connect} from 'react-redux';
import {get, property} from 'lodash';
import Theme from './Theme';
import renderNothingUntil from '../../common/renderNothingUntil';
import * as criteria from '../../common/selectors/criteria';
import {isThemeInactive} from '../../common/selectors/imports';



/**
 *
 */
const mapStateToProps = (state, ownProps) => {
	const themeId = get(ownProps.theme, 'id', null);

	return {
		criteria: criteria.getAllByTheme(state, themeId),
		isInactive: isThemeInactive(state, themeId)
	};
};

/**
 *
 */
const mapDispatchToProps = () => ({});



export default compose(
	connect(
		mapStateToProps,
		mapDispatchToProps
	),
	renderNothingUntil(property('theme'))
)(Theme);
