import React, {PropTypes} from 'react';



/**
 *
 */
const ExternalTool = ({name, onClick}) => (
	<div className="Widget ExternalTool">
		<button
			className="Button"
			type="button"
			onClick={onClick}
			title={`${name} (ouverture de page dans nouvelle fenêtre)`}
		>
			{name}
		</button>
	</div>
);

ExternalTool.propTypes = {
	name: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired
};

export default ExternalTool;
