import {connect} from 'react-redux';
import {getPosition} from '../../common/selectors/panel';
import {setPosition} from '../../common/actions/panel';
import DockMenu from './DockMenu';



/**
 *
 */
const mapStateToProps = (state) => ({
	position: getPosition(state)
});

/**
 *
 */
const mapDispatchToProps = (dispatch) => ({
	onPositionChange(position) {
		dispatch(setPosition(position));
	}
});



export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DockMenu);
