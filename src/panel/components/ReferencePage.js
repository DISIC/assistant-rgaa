import React from 'react';
import {map} from 'lodash';
import ThemesListContainer from './ThemesListContainer';
import ThemeContainer from './ThemeContainer';



/**
 *
 */
export default ({themes}) => (
	<div className="ReferencePage">
		<ThemesListContainer />
		<div className="ReferencePage-themes">
			{map(themes, (theme, n) =>
				<ThemeContainer key={n} theme={theme} />
			)}
		</div>
	</div>
);
