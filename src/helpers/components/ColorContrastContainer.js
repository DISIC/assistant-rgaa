import React, {Component} from 'react';
import createColor from 'color';
import {createMessageHandler, sendMessage} from '../../common/api/runtime';
import {REQUEST_STYLE, UPDATE_STYLE, REQUEST_COLOR, UPDATE_COLOR} from '../actions/colorContrast';
import ColorContrast from './ColorContrast';



/**
 *
 */
export default class ColorContrastContainer extends Component {

	constructor(props) {
		super(props);

		this.state = {
			picking: false,
			backgroundColor: '#000000',
			color: '#ffffff',
			fontSize: '16px',
			fontWeight: 'normal'
		};

		this.handleMessage = createMessageHandler(this.handleMessage.bind(this));
		this.handlePickText = this.handlePickText.bind(this);
		this.handlePickColor = this.handlePickColor.bind(this);
		this.handleChangeColor = this.handleChangeColor.bind(this);
	}

	componentDidMount() {
		chrome.runtime.onMessage.addListener(this.handleMessage);
	}

	componentWillUnmount() {
		chrome.runtime.onMessage.removeListener(this.handleMessage);
	}

	ratio() {
		try {
			const background = createColor(this.state.backgroundColor);
			const color = createColor(this.state.color);
			const ratio = background.contrast(color);

			return Number(ratio.toFixed(3));
		} catch (e) {
			return 0;
		}
	}

	handleMessage({type, payload}) {
		switch (type) {
			case UPDATE_STYLE:
				this.setState({
					...payload,
					picking: false
				});
				break;

			case UPDATE_COLOR:
				this.setState({
					[this.state.picking]: payload,
					picking: false
				});
				break;
		}
	}

	handlePickText() {
		this.setState({
			picking: true
		});

		sendMessage({
			type: REQUEST_STYLE
		});
	}

	handlePickColor(color) {
		this.setState({
			picking: color
		});

		sendMessage({
			type: REQUEST_COLOR
		});
	}

	handleChangeColor(name, value) {
		this.setState({
			[name]: value
		});
	}

	render() {
		const [options] = this.props.args;

		return (
			<ColorContrast
				{...this.state}
				{...options}
				ratio={this.ratio()}
				onPickText={this.handlePickText}
				onPickColor={this.handlePickColor}
				onSwitchColors={this.handleSwitchColors}
			/>
		);
	}
}
