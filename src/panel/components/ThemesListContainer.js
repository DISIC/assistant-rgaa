import {connect} from 'react-redux';
import {values} from 'lodash';
import {toggleMenu} from '../../common/actions/themes';
import {getAllThemes} from '../../common/selectors/reference';
import {isMenuOpen} from '../../common/selectors/themes';
import ThemesList from './ThemesList';



/**
 *
 */
const mapStateToProps = (state) => ({
	themes: values(getAllThemes(state)),
	isOpen: isMenuOpen(state)
});

const mapDispatchToProps = (dispatch) => ({
	setOpen(toggle) {
		dispatch(toggleMenu(toggle));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(ThemesList);
