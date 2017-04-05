import React, {Component, PropTypes} from 'react';
import {sendMessage} from '../../common/api/runtime';
import {GET_CURRENT_TAB, CREATE_TAB} from '../../common/actions/runtime';
import HelperButton from './HelperButton';



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
		const interpolated = this.props.url.replace(':url', this.state.tabUrl);

		sendMessage({
			type: CREATE_TAB,
			url: interpolated
		});
	}

	/**
	 *
	 */
	render() {
		return (
			<HelperButton
				name={this.props.name}
				onClick={this.onClick}
			/>
		);
	}
}

/**
 *
 */
ExternalToolContainer.propTypes = {
	url: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired
};
