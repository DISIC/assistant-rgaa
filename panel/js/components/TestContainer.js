import {connect} from 'react-redux';
import {getHelpersByTest} from '../selectors/helpers';
import {applyHelpers, revertHelpers} from '../actions/tests';
import Test from './Test';



/**
 *
 */
const mapStateToProps = (state, {id}) => ({
	helpers: getHelpersByTest(state, id)
});

/**
 *
 */
const mapDispatchToProps = (dispatch) => ({
	onApply(applied, helpers) {
		dispatch(
			applied
				? applyHelpers(helpers)
				: revertHelpers(helpers)
		);
	}
});



export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Test);
