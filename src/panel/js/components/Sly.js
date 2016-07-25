import React, {Component, PropTypes} from 'react';
import {debounce, omit} from 'lodash';
import jQuery from 'jquery';
require('sly/dist/sly');



/**
 *
 */
export default class ReactSly extends Component {
	constructor() {
		super();

		this.debouncedReload = debounce(() => (
			this.sly && this.sly.reload()
		), 100);
	}

	componentDidMount() {
		this.sly = new Sly(this.refs.sly, this.props.config).init();
		window.addEventListener('resize', this.debouncedReload, true);
	}

	componentWillUnmount() {
		this.sly.destroy();
		window.removeEventListener('resize', this.debouncedReload);
	}

	getContainerProps() {
		return omit(this.props, 'children', 'config');
	}

	render() {
		const containerProps = this.getContainerProps();
		return (
			<div ref="sly" className="Sly-container" {...containerProps}>
				<ul className="Sly-list">
					{this.props.children}
				</ul>
			</div>
		);
	}
}

ReactSly.propTypes = {
	children: PropTypes.node,
	options: PropTypes.object
};
