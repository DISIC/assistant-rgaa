import {connect} from 'react-redux';
import {getThemes, getCurrentTheme} from '../../common/selectors/reference';
import {getInactiveThemeIds} from '../../common/selectors/imports';
import ThemesList from './ThemesList';



/**
 *
 */
const mapStateToProps = (state) => ({
	themes: getThemes(state),
	activeTheme: getCurrentTheme(state),
	inactiveThemes: getInactiveThemeIds(state)
});



export default connect(mapStateToProps)(ThemesList);
