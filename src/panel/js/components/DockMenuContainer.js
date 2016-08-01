import {connect} from 'react-redux';
import * as actions from '../../../common/actions/container';
import DockMenu from './DockMenu';



/**
 *
 */
const mapStateToProps = ({container}) => ({
	popup: !!container.popupId
});

/**
 *
 */
const mapDispatchToProps = (dispatch) => ({
	requestDockToBottom(popup) {
		dispatch(actions.dockToBottom());
		if (popup) {
			dispatch(actions.requestPopup(false));
		}
	},

	requestDockToLeft(popup) {
		dispatch(actions.dockToLeft());
		if (popup) {
			dispatch(actions.requestPopup(false));
		}
	},

	requestDockToRight(popup) {
		dispatch(actions.dockToRight());
		if (popup) {
			dispatch(actions.requestPopup(false));
		}
	},

	requestPopupToggle(showOrHide) {
		dispatch(actions.requestPopup(showOrHide));
	}
});



export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DockMenu);
