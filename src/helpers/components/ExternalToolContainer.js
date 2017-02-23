import React, {Component, PropTypes} from 'react';
import {sendMessage} from '../../common/api/runtime';
import {GET_CURRENT_TAB, CREATE_TAB} from '../../common/actions/runtime';
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
		this.onClick = this.onClick.bind(this);

		this.state = {
			tabUrl: ''
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
				tabUrl: url
			});
		});
	}

	/**
	 *
	 */
	onClick() {
		const url = this.props.args[1];
		const interpolated = url.replace(':url', this.state.tabUrl);
		sendMessage({
			type: CREATE_TAB,
			url: interpolated
		});
	}

	/**
	 *
	 */
	render() {
		const name = this.props.args[0];
		return <ExternalTool name={name} onClick={this.onClick} />;
	}
}

/**
 *
 */
ExternalToolContainer.propTypes = {
	args: PropTypes.array.isRequired
};
