import {connect} from 'react-redux';
import {truncate} from 'lodash';
import {open} from '../../common/actions/options';
import {getPosition, getPageTitle} from '../../common/selectors/panel';
import {getVersion} from '../../common/selectors/reference';
import Header from './Header';



/**
 *
 */
const mapStateToProps = (state) => ({
	referenceVersion: getVersion(state),
	inPopup: getPosition(state) === 'popup',
	title: truncate(getPageTitle(state), {omission: '…'})
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
