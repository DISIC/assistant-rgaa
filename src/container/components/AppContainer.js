import {compose} from 'recompose';
import {connect} from 'react-redux';
import renderNothingUntil from '../../common/renderNothingUntil';
import {getPosition} from '../../common/selectors/panel';
import {Position} from '../../common/api/panel';
import App from './App';



/**
 *
 */
const mapStateToProps = (state) => ({
	position: getPosition(state)
});



export default compose(
	connect(mapStateToProps),
	renderNothingUntil(({position}) => (
		position !== Position.popup
	))
)(App);
