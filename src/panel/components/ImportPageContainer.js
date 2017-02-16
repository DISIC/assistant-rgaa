import {connect} from 'react-redux';
import {isImportActive} from '../../common/selectors/imports';
import {reset} from '../../common/actions/imports';
import ImportPage from './ImportPage';



/**
 *
 */
const mapStateToProps = (state) => ({
	isImportActive: isImportActive(state)
});

/**
 *
 */
const mapDispatchToProps = (dispatch) => ({
	onReset() {
		dispatch(reset());
	}
});



/**
 *
 */
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ImportPage);
