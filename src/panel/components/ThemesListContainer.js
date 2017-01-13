import {connect} from 'react-redux';
import {get} from 'lodash';
import * as themes from '../../common/selectors/themes';
import {getInactiveThemeIds} from '../../common/selectors/imports';
import ThemesList from './ThemesList';



/**
 *
 */
const mapStateToProps = (state) => ({
	themes: themes.getAll(state),
	activeTheme: get(themes.getCurrent(state), 'id'),
	inactiveThemes: getInactiveThemeIds(state)
});



export default connect(mapStateToProps)(ThemesList);
