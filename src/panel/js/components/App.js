import React from 'react';
import DockMenuContainer from './DockMenuContainer';
import Header from './Header';
import TestContainer from './TestContainer';
import ThemesListContainer from './ThemesListContainer';



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

			<TestContainer
				id="1.1.1"
				title="Test 1.1.1 : Chaque image (balise img) a-t-elle un attribut alt ?"
				instructions={`
					<p>Chercher dans la page les images et les boutons images dépourvus d'alternative.</p>
					<p>Si aucun résultat n'est trouvé, le test est validé.</p>
				`}
			/>
		</div>
	);
}
