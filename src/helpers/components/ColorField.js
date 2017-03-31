import React, {PropTypes} from 'react';



/**
 *
 */
const ColorField = ({id, label, children}) => (
	<div className="Form-field">
		<label className="Form-label" htmlFor={id}>
			{label}
		</label>

		{children}
	</div>
);

ColorField.propTypes = {
	id: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node
};

export default ColorField;
