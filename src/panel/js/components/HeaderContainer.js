import {connect} from 'react-redux';
import {open} from '../../../common/actions/options';
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
	}
});



export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header);
