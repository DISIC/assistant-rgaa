import React, {PropTypes} from 'react';
import {injectIntl, intlShape} from 'react-intl';
import {map, get} from 'lodash';
import CriterionContainer from './CriterionContainer';
import SelectField from './SelectField';



/**
 *
 */
function Theme({currentReference, currentTheme, currentCriterion, onCriterionSelect, intl}) {
	const criteriaOptions = map(currentTheme.criteria, ({id: cId = '', title: cTitle = ''}) => ({
		value: cId,
		text: cTitle
	}));

	const focusCriterion = (criterionId) => {
		window.location.hash = criterionId ? `criterion-${criterionId}` : '';
	};

	const onCriterionChange = (criterionId) => {
		focusCriterion(criterionId);
		onCriterionSelect(criterionId, currentReference);
	};

	return (
		<div className="Theme">

			<header className="Theme-header">
				<h1 className="Theme-title">{currentTheme.title}</h1>

				<SelectField
					id={`Theme-${currentTheme.id}-criterion-select`}
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

			
		</div>
	);
}

Theme.propTypes = {
	currentReference: PropTypes.object.isRequired,
	currentTheme: PropTypes.object,
	currentCriterion: PropTypes.object,
	onCriterionSelect: PropTypes.func.isRequired,
	intl: intlShape.isRequired
};

Theme.defaultProps = {
};

export default injectIntl(Theme);
