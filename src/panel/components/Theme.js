import React, {PropTypes} from 'react';
import {injectIntl, intlShape, FormattedMessage} from 'react-intl';
import {map} from 'lodash';
import classNames from 'classnames';
import CriterionContainer from './CriterionContainer';



/**
 *
 */
function Theme({theme, criteria, isInactive, intl}) {
	const className = classNames('Theme', {
		'is-disabled': isInactive
	});

	const title = isInactive
		? intl.formatMessage({id: 'Theme.disabled'})
		: '';

	return (
		<div id={theme.title} className={className} title={title}>
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
	criteria: PropTypes.array,
	isInactive: PropTypes.bool,
	intl: intlShape.isRequired
};

Theme.defaultProps = {
	isInactive: false
};

export default injectIntl(Theme);
