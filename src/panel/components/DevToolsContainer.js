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
		const criterion = document.querySelector(`.Criterion[data-id="${id}"]`);

		if (criterion) {
			criterion.scrollIntoView(true);
		}
	}
});



export default connect(mapStateToProps, null, mergeProps)(DevTools);
