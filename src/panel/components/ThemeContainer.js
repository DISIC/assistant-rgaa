import {compose} from 'recompose';
import {connect} from 'react-redux';
import {get, property} from 'lodash';
import Theme from './Theme';
import renderNothingUntil from '../../common/renderNothingUntil';
import {getAllByTheme} from '../../common/selectors/criteria';



/**
 *
 */
const mapStateToProps = (state, ownProps) => {
	const themeId = get(ownProps.theme, 'id', null);

	return {
		criteria: getAllByTheme(state, themeId)
	};
};



export default compose(
	connect(mapStateToProps),
	renderNothingUntil(property('theme'))
)(Theme);
