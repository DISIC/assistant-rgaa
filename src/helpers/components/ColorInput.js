import React, {PropTypes} from 'react';
import {intlShape, injectIntl} from 'react-intl';



/**
 *
 */
const ColorInput = ({id, color, onPick, onChange, intl}) => {
	const handleChange = (event) =>
		onChange(event.target.value);

	return (
		<div className="ColorInput">
			<input
				id={id}
				type="text"
				className="Form-input"
				pattern="#([0-9a-fA-F]{3}){1,2}?"
				value={color}
				onChange={handleChange}
			/>

			<button
				type="button"
				className="ColorInput-pickButton"
				onClick={onPick}
				title={intl.formatMessage({
					id: 'ColorInput.pickButtonTitle'
				})}
				style={{
					backgroundColor: color
				}}
			></button>
		</div>
	);
};

ColorInput.propTypes = {
	id: PropTypes.string,
	color: PropTypes.string,
	onPick: PropTypes.func,
	onChange: PropTypes.func,
	intl: intlShape
};

export default injectIntl(ColorInput);
