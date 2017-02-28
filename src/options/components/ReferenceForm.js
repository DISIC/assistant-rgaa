import React, {PropTypes} from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';
import renderIf from 'render-if';



/**
 *
 */
function ReferenceForm({version, value, setValue, options, showSuccessMessage, onChange, onSubmit}) {
	const onSelectChange = (event) => {
		setValue(event.target.value);
		onChange(event.target.value);
	};

	const onFormSubmit = (event) => {
		event.preventDefault();
		onSubmit(value);
	};

	return (
		<form onSubmit={onFormSubmit} className="Options-references">
			<div className="Options-field">
				<label htmlFor="Options-referencesSelect">
					<FormattedMessage id="Options.references.label" />
				</label>
				<select
					name="references"
					id="Options-referencesSelect"
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
			<div className="Options-submit">
				<button>
					<FormattedMessage id="Options.references.submit" />
				</button>
			</div>
			{renderIf(showSuccessMessage)(() =>
				<p className="Options-success">
					<FormattedMessage id="Options.references.successMessage" />
				</p>
			)}
		</form>
	);
}

ReferenceForm.propTypes = {
	value: PropTypes.string.isRequired,
	options: PropTypes.array.isRequired,
	onChange: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	setValue: PropTypes.func.isRequired,
	showSuccessMessage: PropTypes.bool.isRequired
};

export default injectIntl(ReferenceForm);
