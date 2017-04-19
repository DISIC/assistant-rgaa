import {connect} from 'react-redux';
import {compose} from 'recompose';
import {property, values} from 'lodash';
import renderNothingUntil from '../../common/renderNothingUntil';
import {saveScrollPosition} from '../../common/actions/themes';
import {getScrollPosition} from '../../common/selectors/themes';
import {isLoaded, getAllThemes} from '../../common/selectors/reference';
import ReferencePage from './ReferencePage';
import deferRendering from './deferRendering';



/**
 *
 */
const mapStateToProps = (state) => ({
	initialScrollPosition: getScrollPosition(state),
	isReferenceLoaded: isLoaded(state),
	themes: values(getAllThemes(state))
});

/**
 *
 */
const mapDispatchToProps = (dispatch) => ({
	onScroll(event) {
		dispatch(saveScrollPosition(event.target.scrollTop));
	}
});



/**
 *
 */
export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	renderNothingUntil(property('isReferenceLoaded'))
// I couln't figure out how to use deferRendering ala recompose HoCs
)(deferRendering(ReferencePage));
