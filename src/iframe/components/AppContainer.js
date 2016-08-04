import {connect} from 'react-redux';
import {isOpen, getPopupWindowId, getPosition} from '../../common/selectors/container';
import App from './App';



/**
 *
 */
const mapStateToProps = (state) => ({
	open: isOpen(state) && !getPopupWindowId(state),
	position: getPosition(state)
});



export default connect(mapStateToProps)(App);
