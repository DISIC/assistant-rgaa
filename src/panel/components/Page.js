import React, {PropTypes} from 'react';



/**
 *
 */
const Page = ({title, children}) => (
	<div className="Page">
		<h1 className="Page-title Title">
			{title}
		</h1>

		<div className="Page-body">
			{children}
		</div>
	</div>
);

Page.propTypes = {
	title: PropTypes.node.isRequired,
	children: PropTypes.node.isRequired
};

export default Page;
