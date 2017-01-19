import React, {PropTypes} from 'react';
import HeaderContainer from './HeaderContainer';



/**
 *
 */
export default function App({children}) {
	return (
		<div className="App">
			<HeaderContainer />
			{children}
		</div>
	);
}

App.propTypes = {
	children: PropTypes.element
};
