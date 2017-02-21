import React, {Component} from 'react';
import {createMessageHandler} from '../../common/api/runtime';
import {GET} from '../actions/headingsHierarchy';
import HeadingsHierarchy from './HeadingsHierarchy';



/**
 *
 */
export default class HeadingsHierarchyContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			items: []
		};

		this.handleMessage = createMessageHandler(this.handleMessage.bind(this));
	}

	componentDidMount() {
		chrome.runtime.onMessage.addListener(this.handleMessage);
	}

	componentWillUnmount() {
		chrome.runtime.onMessage.removeListener(this.handleMessage);
	}

	handleMessage({type, payload}) {
		switch (type) {
			case GET:
				this.setState({items: payload});
				break;

			default:
				break;
		}
	}

	render() {
		return (
			<HeadingsHierarchy items={this.state.items} />
		);
	}
}
