import React, {PropTypes} from 'react';



/**
 *
 */
const ExternalTool = ({name, title, disabled, onClick}) => (
	<div className="Widget ExternalTool">
		<button
			className="Button"
			type="button"
			disabled={disabled}
			onClick={onClick}
			title={title || `${name} (ouverture de page dans nouvelle fenêtre)`}
		>
			{name}
		</button>
	</div>
);

ExternalTool.propTypes = {
	name: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	title: PropTypes.string,
	disabled: PropTypes.bool
};

export default ExternalTool;
