import {lifecycle} from 'recompose';
import fastmatter from 'fastmatter';
import marked from 'marked';
import {replaceLocalUrls} from '../../common/api/markdown';
import MarkdownPage from './MarkdownPage';



/**
 *
 */
const enhance = lifecycle({
	componentDidMount() {
		const basePath = `data/pages/${this.props.name}`;
		const url = chrome.extension.getURL(`${basePath}/index.md`);

		fetch(url)
			.then((response) =>
				response.text()
			)
			.then(fastmatter)
			.then(({attributes, body}) => {
				this.setState({
					title: attributes.title,
					html: marked(replaceLocalUrls(body, basePath))
				});
			});
	}
});

export default enhance(MarkdownPage);
