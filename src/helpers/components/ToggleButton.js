import React, {PropTypes} from 'react';



/**
 *
 */
const ToggleButton = ({pressed, onPress, onRelease, children, ...props}) => (
	<button
		className="Button"
		type="button"
		aria-pressed={pressed}
		onClick={() => pressed ? onRelease() : onPress()}
		{...props}
	>
		{children}
	</button>
);

ToggleButton.propTypes = {
	pressed: PropTypes.bool,
	onPress: PropTypes.func,
	onRelease: PropTypes.func,
	children: PropTypes.node
};

export default ToggleButton;
