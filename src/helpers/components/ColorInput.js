import React, {PropTypes} from 'react';
import {intlShape, injectIntl} from 'react-intl';
import classNames from 'classnames';
import createColor from 'color';



/**
 *
 */
const isValidColor = (color) => {
	try {
		createColor(color);
		return true;
	} catch (e) {
		return false;
	}
};

/**
 *
 */
const ColorInput = ({id, color, onChange, children, intl}) => {
	const handleChange = (event) =>
		onChange(event.target.value);

	const isInvalid = !isValidColor(color);
	const className = classNames({
		'Form-input': true,
		isInvalid
	});

	const inputProps = {
		id,
		className,
		type: 'text',
		value: color,
		onChange: handleChange,
		'aria-invalid': isInvalid
	};

	if (isInvalid) {
		inputProps.title = intl.formatMessage({
			id: 'ColorInput.invalidFormatError'
		});
	}

	return (
		<div className="ColorInput">
			<input {...inputProps} />

			<div
				className="ColorInput-sample"
				style={{
					backgroundColor: color
				}}
			/>

			{children}
		</div>
	);
};

ColorInput.propTypes = {
	id: PropTypes.string,
	color: PropTypes.string,
	onChange: PropTypes.func,
	children: PropTypes.node,
	intl: intlShape
};

export default injectIntl(ColorInput);
