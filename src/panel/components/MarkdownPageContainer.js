import {lifecycle} from 'recompose';
import fastmatter from 'fastmatter';
import marked from 'marked';
import MarkdownPage from './MarkdownPage';



/**
 *
 */
const enhance = lifecycle({
	componentDidMount() {
		const path = `data/pages/${this.props.name}.md`;
		const url = chrome.extension.getURL(path);

		fetch(url)
			.then((response) =>
				response.text()
			)
			.then(fastmatter)
			.then(({attributes, body}) => {
				this.setState({
					title: attributes.title,
					html: marked(body)
				});
			});
	}
});

export default enhance(MarkdownPage);
