import React, {PropTypes} from 'react';
import {injectIntl, intlShape} from 'react-intl';
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
			<h2 className="Theme-title Title">{theme.title}</h2>

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
	currentCriterion: PropTypes.object,
	isInactive: PropTypes.bool,
	intl: intlShape.isRequired
};

Theme.defaultProps = {
	isInactive: false
};

export default injectIntl(Theme);
