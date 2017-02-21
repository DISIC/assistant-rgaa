import React, {Component, PropTypes} from 'react';
import {sendMessage} from '../../common/api/runtime';
import {GET_CURRENT_TAB} from '../../common/actions/runtime';
import ExternalTool from './ExternalTool';



/**
 *
 */
export default class ExternalToolContainer extends Component {

	/**
	 *
	 */
	constructor(props) {
		super(props);

		this.state = {
			url: ''
		};
	}

	/**
	 *
	 */
	componentDidMount() {
		sendMessage({
			type: GET_CURRENT_TAB
		}).then(({url}) => {
			this.setState({
				url
			});
		});
	}

	/**
	 *
	 */
	render() {
		const [name, url] = this.props.args;
		const interpolated = url.replace(':url', this.state.url);

		return <ExternalTool name={name} url={interpolated} />;
	}
}

/**
 *
 */
ExternalToolContainer.propTypes = {
	args: PropTypes.array.isRequired
};
