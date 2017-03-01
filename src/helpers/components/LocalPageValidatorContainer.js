import React, {Component} from 'react';
import {sendMessage} from '../../common/api/runtime';
import {GET_CURRENT_TAB, VALIDATE_PAGE} from '../../common/actions/runtime';
import {isFirefox} from '../../common/api/uasniffer';
import HelperButton from './HelperButton';



/**
 *
 */
export default class LocalPageValidatorContainer extends Component {
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
		return sendMessage({
			type: VALIDATE_PAGE,
			url: this.state.tabUrl
		});
	}

	/**
	 *
	 */
	render() {
		if (isFirefox(window.navigator.userAgent)) {
			return (
				<HelperButton
					name="Validateur W3C (HTML local)"
					onClick={this.onClick}
					disabled
					title="Fonctionnalité à venir sur Firefox"
				/>
			);
		}

		return (
			<HelperButton
				name="Validateur W3C (HTML local)"
				onClick={this.onClick}
			/>
		);
	}
}

/**
 *
 */
LocalPageValidatorContainer.propTypes = {
};
