import React from 'react';
import DockMenuContainer from './DockMenuContainer';
import Header from './Header';
import ThemesListContainer from './ThemesListContainer';
import ThemeContainer from './ThemeContainer';



/**
 *
 */
export default function App() {
	return (
		<div className="App">
			<Header>
				<DockMenuContainer />
			</Header>

			<ThemesListContainer />

			<ThemeContainer />
		</div>
	);
}
