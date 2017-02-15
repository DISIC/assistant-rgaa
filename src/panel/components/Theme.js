import React, {PropTypes} from 'react';
import {FormattedMessage} from 'react-intl';
import {map} from 'lodash';
import CriterionContainer from './CriterionContainer';



/**
 *
 */
function Theme({theme, criteria}) {
	return (
		<div id={theme.title} className="Theme">
			<div className="Theme-header">
				<h2 className="Theme-title Title">{theme.title}</h2>
				<a
					href="#themesMenu"
					className="ScreenReaderOnly Theme-menuLink"
				>
					<FormattedMessage id="Theme.themesMenu" />
				</a>
			</div>

			<ul className="Theme-criteria">
				{map(criteria, criterion =>
					<CriterionContainer
						key={`criterion-${criterion.id}`}
						{...criterion}
					/>
				)}
			</ul>
		</div>
	);
}

Theme.propTypes = {
	theme: PropTypes.object,
	criteria: PropTypes.array
};

export default Theme;
