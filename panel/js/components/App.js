import React from 'react';
import MenuContainer from './MenuContainer';
import TestContainer from './TestContainer';



/**
 *
 */
export default function App() {
	return (
		<div className="App">
			<MenuContainer />

			<TestContainer
				title="Test 1.1.1 : Chaque image (balise img) a-t-elle un attribut alt ?"
				instructions={`
					<p>Chercher dans la page les images et les boutons images dépourvus d'alternative.</p>
					<p>Si aucun résultat n'est trouvé, le test est validé.</p>
				`}
			/>
		</div>
	);
}
