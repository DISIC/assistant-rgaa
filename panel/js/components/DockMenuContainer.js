import {connect} from 'react-redux';
import * as actions from '../actions/dock';
import DockMenu from './DockMenu';


/**
 *
 */
const mapStateToProps = () => ({});

/**
 *
 */
const mapDispatchToProps = (dispatch) => ({
	onBottomClick() {
		dispatch(actions.dockToBottom());
	},

	onLeftClick() {
		dispatch(actions.dockToLeft());
	},

	onRightClick() {
		dispatch(actions.dockToRight());
	},

	onPopupClick() {
		dispatch(actions.togglePopup());
	}
});



export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DockMenu);
