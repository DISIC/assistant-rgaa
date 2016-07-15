import {connect} from 'react-redux';
import * as actions from '../actions/dock';
import DockMenu from './DockMenu';


/**
 *
 */
const mapStateToProps = ({dock}) => ({
	position: dock.position
});

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

	onExternalClick() {
		dispatch(actions.undock());
	}
});



export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DockMenu);
