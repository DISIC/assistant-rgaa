import React, {PropTypes} from 'react';



/**
 *
 */
const RichText = ({html}) => (
	<div
		className="RichText"
		// eslint-disable-next-line react/no-danger
		dangerouslySetInnerHTML={{
			__html: html
		}}
	/>
);

RichText.propTypes = {
	html: PropTypes.string
};

export default RichText;
