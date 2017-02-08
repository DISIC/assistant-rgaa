import {connect} from 'react-redux';
import {open} from '../../common/actions/options';
import {getVersion} from '../../common/selectors/reference';
import Header from './Header';



/**
 *
 */
const mapStateToProps = (state) => ({
	referenceVersion: getVersion(state)
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
