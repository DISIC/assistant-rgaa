import {connect} from 'react-redux';
import {compose} from 'recompose';
import {property, values} from 'lodash';
import renderNothingUntil from '../../common/renderNothingUntil';
import {isLoaded} from '../../common/selectors/reference';
import * as themes from '../../common/selectors/themes';
import ReferencePage from './ReferencePage';



/**
 *
 */
const mapStateToProps = (state) => ({
	isReferenceLoaded: isLoaded(state),
	themes: values(themes.getAll(state))
});



export default compose(
	connect(mapStateToProps),
	renderNothingUntil(property('isReferenceLoaded'))
)(ReferencePage);
