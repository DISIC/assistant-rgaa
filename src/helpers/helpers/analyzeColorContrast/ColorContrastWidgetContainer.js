import React, {Component} from 'react';
import {createMessageHandler, sendMessage} from '../../../common/api/runtime';
import {REQUEST_STYLE, UPDATE_STYLE} from './actions';
import ColorContrastWidget from './ColorContrastWidget';



/**
 *
 */
export default class ColorContrastWidgetContainer extends Component {

	constructor(props) {
		super(props);

		this.state = {
			eyedropping: false,
			backgroundColor: '#000000',
			color: '#ffffff',
			fontSize: '16px',
			fontWeight: 'normal'
		};

		this.handleMessage = createMessageHandler(this.handleMessage.bind(this));
		this.handleSelectRequest = this.handleSelectRequest.bind(this);
	}

	componentDidMount() {
		chrome.runtime.onMessage.addListener(this.handleMessage);
	}

	componentWillUnmount() {
		chrome.runtime.onMessage.removeListener(this.handleMessage);
	}

	handleMessage({type, style}) {
		switch (type) {
			case UPDATE_STYLE:
				this.setState(style);
				break;
		}
	}

	handleSelectRequest() {
		sendMessage({
			type: REQUEST_STYLE
		});
	}

	render() {
		return (
			<ColorContrastWidget
				{...this.state}
				onSelectRequest={this.handleSelectRequest}
			/>
		);
	}
}
