import {connect} from 'react-redux';
import {getPopupWindowId, getPosition} from '../../../common/selectors/container';
import * as actions from '../../../common/actions/container';
import DockMenu from './DockMenu';



/**
 *
 */
const mapStateToProps = (state) => ({
	popup: !!getPopupWindowId(state),
	position: getPosition(state)
});

/**
 *
 */
const mapDispatchToProps = (dispatch) => ({
	onDockToBottom() {
		dispatch(actions.dockToBottom());
	},

	onDockToLeft() {
		dispatch(actions.dockToLeft());
	},

	onDockToRight() {
		dispatch(actions.dockToRight());
	},

	onTogglePopup() {
		dispatch(actions.togglePopup());
	}
});



export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DockMenu);
