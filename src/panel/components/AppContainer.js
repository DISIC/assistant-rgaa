import {connect} from 'react-redux';
import {isFolded} from '../../common/selectors/panel';
import {toggleFold} from '../../common/actions/panel';
import App from './App';



/**
 *
 */
const mapStateToProps = (state) => ({
	folded: isFolded(state)
});

/**
 *
 */
const mapDispatchToProps = (dispatch) => ({
	onUnfoldRequest() {
		dispatch(toggleFold(false));
	}
});



/**
 *
 */
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
