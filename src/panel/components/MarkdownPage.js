import React, {PropTypes} from 'react';
import Page from './Page';
import RichText from './RichText';



/**
 *
 */
const MarkdownPage = ({title, html}) => (
	<Page title={title}>
		<RichText html={html} />
	</Page>
);

MarkdownPage.propTypes = {
	title: PropTypes.node.isRequired,
	html: PropTypes.string.isRequired
};

export default MarkdownPage;
