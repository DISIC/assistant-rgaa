import React, {PropTypes} from 'react';
import classNames from 'classnames';
import renderIf from 'render-if';
import {noop, map} from 'lodash';



/**
 *
 */
export default function SelectField(
	{id, label, options, emptyOption, className, error, onChange, ...props}
) {
	const handleChange = (event) =>
		onChange(event.target.value);

	const showOption = (option) => (
		<option value={option.value} key={option.value}>{option.text}</option>
	);

	const classes = classNames('Form-field', 'Form-field--select', {
		'Form-field--required': props.required
	}, className);

	return (
		<div className={classes}>
			<label className="Form-label" htmlFor={id}>
				{label}
			</label>

			<select
				{...props}
				id={id}
				className="Form-select"
				type="select"
				onChange={handleChange}
			>
				{renderIf(emptyOption)(() =>
					showOption({
						value: '',
						text: emptyOption
					})
				)}
				{map(options, showOption)}
			</select>

			{renderIf(error)(() =>
				<p className="Form-error">{error}</p>
			)}
		</div>
	);
}

SelectField.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.node.isRequired,
	required: PropTypes.bool,
	options: PropTypes.array.isRequired,
	emptyOption: PropTypes.string,
	type: PropTypes.string,
	error: PropTypes.string,
	onChange: PropTypes.func,
	className: PropTypes.string
};

SelectField.defaultProps = {
	onChange: noop
};
