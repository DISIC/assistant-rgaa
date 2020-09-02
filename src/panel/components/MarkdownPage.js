import React, {PropTypes} from 'react';
import Page from './Page';
import RichText from './RichText';



/**
 *
 */
const MarkdownPage = ({name, title, html}) => (
	<Page id={name} title={title}>
		<RichText html={html} />
	</Page>
);

MarkdownPage.propTypes = {
	name: PropTypes.string.isRequired,
	title: PropTypes.node.isRequired,
	html: PropTypes.string.isRequired
};

export default MarkdownPage;
