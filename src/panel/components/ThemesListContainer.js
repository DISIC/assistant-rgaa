import {connect} from 'react-redux';
import {values} from 'lodash';
import {toggleMenu} from '../../common/actions/themes';
import * as themes from '../../common/selectors/themes';
import {getInactiveThemeIds} from '../../common/selectors/imports';
import ThemesList from './ThemesList';



/**
 *
 */
const mapStateToProps = (state) => ({
	themes: values(themes.getAll(state)),
	inactiveThemes: getInactiveThemeIds(state),
	isOpen: themes.isMenuOpen(state)
});

const mapDispatchToProps = (dispatch) => ({
	setOpen(toggle) {
		dispatch(toggleMenu(toggle));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(ThemesList);
