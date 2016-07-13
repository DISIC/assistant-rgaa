import {connect} from 'react-redux';
import {getThemes} from '../selectors/reference';
import Menu from './Menu';



/**
 *
 */
const mapStateToProps = (state) => ({
	themes: getThemes(state)
});



export default connect(mapStateToProps)(Menu);
