import React, {PropTypes} from 'react';
import {injectIntl, intlShape} from 'react-intl';
import {map, get} from 'lodash';
import classNames from 'classnames';
import {stripTags} from '../../common/api/dom';
import CriterionContainer from './CriterionContainer';
import SelectField from './SelectField';



/**
 *
 */
function Theme({
	theme, criteria, currentCriterion, isInactive, onCriterionSelect, intl
}) {
	const criteriaOptions = map(criteria, ({id = '', title = ''}) => ({
		value: id,
		text: stripTags(title)
	}));

	const focusCriterion = (criterionId) => {
		window.location.hash = criterionId ? `criterion-${criterionId}` : '';
	};

	const onCriterionChange = (criterionId) => {
		focusCriterion(criterionId);
		onCriterionSelect(criterionId);
	};

	const className = classNames('Theme', {
		'is-disabled': isInactive
	});

	const title = isInactive
		? intl.formatMessage({id: 'Theme.disabled'})
		: '';

	return (
		<div className={className} title={title}>
			<header className="Theme-header">
				<h1 className="Theme-title">{theme.title}</h1>

				<SelectField
					id={`Theme-${theme.id}-criterion-select`}
					name="criteria"
					label={intl.formatMessage({
						id: 'Theme.criterion.select.label'
					})}
					className="Theme-criterionSelect"
					emptyOption={intl.formatMessage({
						id: 'Theme.criterion.select.emptyOption'
					})}
					value={get(currentCriterion, 'id', '')}
					options={criteriaOptions}
					onChange={onCriterionChange}
				/>
			</header>

			<div className="Theme-content">
				<ul className="Theme-criteria">
					{map(criteria, criterion =>
						<li
							key={`criterion-${criterion.id}`}
							className="Theme-criterion"
						>
							<CriterionContainer {...criterion} />
						</li>
					)}
				</ul>
			</div>
		</div>
	);
}

Theme.propTypes = {
	theme: PropTypes.object,
	criteria: PropTypes.array,
	currentCriterion: PropTypes.object,
	isInactive: PropTypes.bool,
	onCriterionSelect: PropTypes.func.isRequired,
	intl: intlShape.isRequired
};

Theme.defaultProps = {
	isInactive: false
};

export default injectIntl(Theme);
