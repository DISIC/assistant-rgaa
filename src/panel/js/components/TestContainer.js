import {connect} from 'react-redux';
import {getHelpersByTest} from '../../../common/selectors/helpers';
import {requestApplyHelpers, requestRevertHelpers} from '../../../common/actions/helpers';
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
				? requestApplyHelpers(helpers)
				: requestRevertHelpers(helpers)
		);
	}
});



export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Test);
