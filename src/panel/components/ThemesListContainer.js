import {connect} from 'react-redux';
import {getThemes, getInactiveThemes, getCurrentTheme} from '../../common/selectors/reference';
import ThemesList from './ThemesList';



/**
 *
 */
const mapStateToProps = (state) => ({
	themes: getThemes(state),
	activeTheme: getCurrentTheme(state),
	inactiveThemes: getInactiveThemes(state)
});



export default connect(mapStateToProps)(ThemesList);
