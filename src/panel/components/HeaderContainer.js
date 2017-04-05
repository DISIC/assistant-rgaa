import {connect} from 'react-redux';
import {truncate} from 'lodash';
import {open} from '../../common/actions/options';
import {toggleFold} from '../../common/actions/panel';
import {getPosition, getPageTitle} from '../../common/selectors/panel';
import {CLOSE_PANEL} from '../../common/actions/runtime';
import {sendMessage} from '../../common/api/runtime';
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
	},

	onCloseClick() {
		sendMessage({
			type: CLOSE_PANEL
		});
	},

	onMinimizeClick() {
		dispatch(toggleFold(true));
	}
});



export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header);
