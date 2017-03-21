import {connect} from 'react-redux';
import {setReferenceVersion} from '../../common/actions/reference';
import {getVersion} from '../../common/selectors/reference';
import DevTools from './DevTools';



/**
 *
 */
const mapStateToProps = (state) => ({
	version: getVersion(state)
});

/**
 *
 */
const mergeProps = ({version, ...stateProps}, {dispatch}, ownProps) => ({
	...ownProps,
	...stateProps,
	onReloadReference() {
		dispatch(setReferenceVersion(version));
	},
	onSearchCriterion(id) {
		document
			.querySelector(`.Criterion[data-id="${id}"]`)
			.scrollIntoView(true);
	}
});



export default connect(mapStateToProps, null, mergeProps)(DevTools);
