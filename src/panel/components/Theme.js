import React, {PropTypes} from 'react';
import {FormattedMessage} from 'react-intl';
import {map} from 'lodash';
import {ThemeShape} from '../../common/types/theme';
import {CriterionShape} from '../../common/types/criterion';
import CriterionContainer from './CriterionContainer';



/**
 *
 */
function Theme({theme, criteria}) {
	return (
		<div id={`theme-${theme.id}`} className="Theme">
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
				{map(criteria, criterion => (
					<CriterionContainer
						key={criterion.id}
						{...criterion}
					/>
				))}
			</ul>
		</div>
	);
}

Theme.propTypes = {
	theme: ThemeShape.isRequired,
	criteria: PropTypes.arrayOf(CriterionShape).isRequired
};

export default Theme;
