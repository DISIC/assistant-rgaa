import {connect} from 'react-redux';
import {get, values} from 'lodash';
import * as themes from '../../common/selectors/themes';
import {getInactiveThemeIds} from '../../common/selectors/imports';
import ThemesList from './ThemesList';



/**
 *
 */
const mapStateToProps = (state) => ({
	themes: values(themes.getAll(state)),
	activeTheme: get(themes.getCurrent(state), 'id'),
	inactiveThemes: getInactiveThemeIds(state)
});



export default connect(mapStateToProps)(ThemesList);
