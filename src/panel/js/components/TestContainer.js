import {connect} from 'react-redux';
import {getHelpersByTest} from '../../../common/selectors/helpers';
import {applyHelpers, revertHelpers} from '../../../common/actions/helpers';
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
const mapDispatchToProps = (dispatch, {id}) => ({
	onApply(applied, helpers) {
		dispatch(
			applied
				? applyHelpers(id, helpers)
				: revertHelpers(id, helpers)
		);
	}
});



export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Test);
