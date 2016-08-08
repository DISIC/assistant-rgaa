import {connect} from 'react-redux';
import {isModalOpen} from '../../common/selectors/imports';
import {closeModal} from '../../common/actions/imports';
import ImportModal from './ImportModal';
import {parseXml} from '../../common/api/imports';



/**
 *
 */
const mapStateToProps = (state) => ({
	open: isModalOpen(state)
});

/**
 *
 */
const mapDispatchToProps = (dispatch) => ({
	onClose() {
		dispatch(closeModal());
	},

	onFileSelection(content) {
		parseXml(content);
	}
});



export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ImportModal);
