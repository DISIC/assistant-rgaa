import {connect} from 'react-redux';
import {compose} from 'recompose';
import {property, values} from 'lodash';
import renderNothingUntil from '../../common/renderNothingUntil';
import {isLoaded, getAllThemes} from '../../common/selectors/reference';
import ReferencePage from './ReferencePage';



/**
 *
 */
const mapStateToProps = (state) => ({
	isReferenceLoaded: isLoaded(state),
	themes: values(getAllThemes(state))
});



export default compose(
	connect(mapStateToProps),
	renderNothingUntil(property('isReferenceLoaded'))
)(ReferencePage);
