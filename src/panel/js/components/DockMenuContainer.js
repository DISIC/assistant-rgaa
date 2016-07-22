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
	requestDockToBottom() {
		dispatch(actions.dockToBottom());
	},

	requestDockToLeft() {
		dispatch(actions.dockToLeft());
	},

	requestDockToRight() {
		dispatch(actions.dockToRight());
	},

	requestPopupToggle(showOrHide) {
		dispatch(actions.requestPopup(showOrHide));
	}
});



export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DockMenu);
