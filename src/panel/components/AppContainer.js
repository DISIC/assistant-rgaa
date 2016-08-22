import {connect} from 'react-redux';
import {compose, branch, renderNothing} from 'recompose';
import {property, identity} from 'lodash';
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
	// renders nothing if no reference is loaded
	branch(
		property('isReferenceLoaded'),
		identity,
		renderNothing
	)
)(App);
