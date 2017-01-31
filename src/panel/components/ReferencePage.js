import React, {PropTypes} from 'react';
import {map} from 'lodash';
import ThemesListContainer from './ThemesListContainer';
import ThemeContainer from './ThemeContainer';



/**
 *
 */
const ReferencePage = ({themes}) => (
	<div className="ReferencePage">
		<ThemesListContainer />
		<div className="ReferencePage-themes">
			{map(themes, (theme, n) =>
				<ThemeContainer key={n} theme={theme} />
			)}
		</div>
	</div>
);

ReferencePage.propTypes = {
	themes: PropTypes.array.isRequired
};

export default ReferencePage;
