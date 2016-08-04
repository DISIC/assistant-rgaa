import {connect} from 'react-redux';
import {getThemes, getCurrentTheme} from '../../common/selectors/reference';
import ThemesList from './ThemesList';



/**
 *
 */
const mapStateToProps = (state) => ({
	themes: getThemes(state),
	activeTheme: getCurrentTheme(state)
});



export default connect(mapStateToProps)(ThemesList);
