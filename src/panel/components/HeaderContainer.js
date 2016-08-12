import {connect} from 'react-redux';
import {open} from '../../common/actions/options';
import {openModal, resetModalContent, resetResults} from '../../common/actions/imports';
import {isImportActive} from '../../common/selectors/imports';
import Header from './Header';



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
	onOptionsClick() {
		dispatch(open());
	},

	onStartImportClick() {
		dispatch(resetModalContent());
		dispatch(openModal());
	},

	onResetImportClick() {
		dispatch(resetResults());
	}
});



export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header);
