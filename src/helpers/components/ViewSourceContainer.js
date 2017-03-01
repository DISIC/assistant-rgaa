import React, {Component} from 'react';
import {sendMessage} from '../../common/api/runtime';
import {GET_CURRENT_TAB, CREATE_TAB, VIEW_PAGE_SOURCE} from '../../common/actions/runtime';
import {isFirefox} from '../../common/api/uasniffer';
import HelperButton from './HelperButton';



/**
 *
 */
export default class ViewSourceContainer extends Component {
	/**
	 *
	 */
	constructor(props) {
		super(props);
		this.onFirefoxClick = this.onFirefoxClick.bind(this);
		this.onChromeClick = this.onChromeClick.bind(this);

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
	 * open a home-made page showing the source page in Firefox
	 * as we can't open the 'view-source' page in Firefox
	 */
	onFirefoxClick() {
		return sendMessage({
			type: VIEW_PAGE_SOURCE,
			url: this.state.tabUrl
		});
	}

	/**
	 * directly open 'view-source' in Chrome as it allows it
	 */
	onChromeClick() {
		return sendMessage({
			type: CREATE_TAB,
			url: `view-source:${this.state.tabUrl}`
		});
	}

	/**
	 *
	 */
	render() {
		const onClick = isFirefox(window.navigator.userAgent)
			? this.onFirefoxClick
			: this.onChromeClick;
		return (
			<HelperButton
				name="Voir les sources"
				onClick={onClick}
			/>
		);
	}
}

/**
 *
 */
ViewSourceContainer.propTypes = {
};
