import {compose, withState} from 'recompose';
import {connect} from 'react-redux';
import {getHelpersByTest} from '../../common/selectors/helpers';
import TestHelpers from './TestHelpers';



/**
 *
 */
const mapStateToProps = (state, {id}) => ({
	helpers: getHelpersByTest(state, id)
});



export default compose(
	connect(mapStateToProps),
	withState(
		'isOpen',
		'onToggleRequest',
		false
	)
)(TestHelpers);
