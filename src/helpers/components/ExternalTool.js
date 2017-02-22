import React, {PropTypes} from 'react';



/**
 *
 */
const ExternalTool = ({name, url}) => (
	<div className="Widget ExternalTool">
		<a
			className="Button"
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			title={`${name} (nouvelle fenêtre)`}
		>
			{name}
		</a>
	</div>
);

ExternalTool.propTypes = {
	name: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired
};

export default ExternalTool;
