import {connect} from 'react-redux';
import {compose} from 'recompose';
import {property} from 'lodash';
import renderNothingUntil from '../../common/renderNothingUntil';
import {isLoaded} from '../../common/selectors/reference';
import App from './App';



/**
 *
 */
const mapStateToProps = (state) => ({
	isReferenceLoaded: isLoaded(state)
});



export default compose(
	connect(mapStateToProps),
	renderNothingUntil(property('isReferenceLoaded'))
)(App);
