import {connect} from 'react-redux';
import {open} from '../../common/actions/options';
import {openModal} from '../../common/actions/imports';
import Header from './Header';



/**
 *
 */
const mapStateToProps = () => ({
});

/**
 *
 */
const mapDispatchToProps = (dispatch) => ({
	onOptionsClick() {
		dispatch(open());
	},

	onImportClick() {
		dispatch(openModal());
	}
});



export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header);
