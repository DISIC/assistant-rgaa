import {compose} from 'recompose';
import {connect} from 'react-redux';
import {get, property} from 'lodash';
import Theme from './Theme';
import renderNothingUntil from '../../common/renderNothingUntil';
import {getAllCriteriaByTheme} from '../../common/selectors/reference';



/**
 *
 */
const mapStateToProps = (state, ownProps) => {
	const themeId = get(ownProps.theme, 'id', null);

	return {
		criteria: getAllCriteriaByTheme(state, themeId)
	};
};



export default compose(
	connect(mapStateToProps),
	renderNothingUntil(property('theme'))
)(Theme);
