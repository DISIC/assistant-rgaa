import React, {PropTypes} from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';



/**
 *
 */
function ReferenceSelect({value, options, onChange}) {
	const onSelectChange = (event) =>
		onChange(event.target.value);

	return (
		<div className="rgaaExt-Options-references">
			<label htmlFor="rgaaExt-Options-referencesSelect">
				<FormattedMessage id="Options.references.label" />
			</label>
			<select
				name="references"
				id="rgaaExt-Options-referencesSelect"
				value={value}
				onChange={onSelectChange}
			>
				{options.map(ref =>
					<option
						key={`ref-${ref.value}`}
						value={ref.value}
					>
						{ref.name}
					</option>
				)}
			</select>
		</div>
	);
}

ReferenceSelect.propTypes = {
	value: PropTypes.string.isRequired,
	options: PropTypes.array.isRequired,
	onChange: PropTypes.func.isRequired
};

export default injectIntl(ReferenceSelect);
