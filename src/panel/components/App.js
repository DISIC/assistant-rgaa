import React from 'react';
import HeaderContainer from './HeaderContainer';
import ThemesListContainer from './ThemesListContainer';
import ThemeContainer from './ThemeContainer';



/**
 *
 */
export default function App() {
	return (
		<div className="App">
			<HeaderContainer />

			<ThemesListContainer />

			<ThemeContainer />
		</div>
	);
}
