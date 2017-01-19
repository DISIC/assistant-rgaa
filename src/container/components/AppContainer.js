import {compose} from 'recompose';
import {connect} from 'react-redux';
import {property} from 'lodash';
import renderNothingUntil from '../../common/renderNothingUntil';
import {isOpen, getPopupWindowId, getPosition} from '../../common/selectors/container';
import App from './App';



/**
 *
 */
const mapStateToProps = (state) => ({
	open: isOpen(state) && !getPopupWindowId(state),
	position: getPosition(state)
});



export default compose(
	connect(mapStateToProps),
	renderNothingUntil(property('open'))
)(App);
