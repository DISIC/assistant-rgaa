import {connect} from 'react-redux';
import {applyHelpers, revertHelpers} from '../actions/tests';
import Test from './Test';



/**
 *
 */
const mapStateToProps = () => ({});

/**
 *
 */
const mapDispatchToProps = (dispatch) => ({
	onApply(applied) {
		dispatch(
			applied
				? applyHelpers()
				: revertHelpers()
		);
	}
});



export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Test);
