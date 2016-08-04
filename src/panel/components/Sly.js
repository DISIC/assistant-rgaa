import React, {Component, PropTypes} from 'react';
import {debounce, omit, get, toInteger} from 'lodash';
require('sly/dist/sly');



/**
 *
 */
export default class ReactSly extends Component {
	componentDidMount() {
		this.sly = new Sly(this.refs.sly, this.props.config); // eslint-disable-line no-undef

		this.sly.on('load', this.recalculateWidth.bind(this));

		this.debouncedReload = debounce(() => (
			this.sly && this.sly.reload()
		), 100);
		window.addEventListener('resize', this.debouncedReload, true);

		this.sly.init();
	}

	componentWillUnmount() {
		this.sly.destroy();
		window.removeEventListener('resize', this.debouncedReload);
	}

	getContainerProps() {
		return omit(this.props, 'children', 'config');
	}

	getSlyElement() {
		return this.sly;
	}

	/*
	 * there is a bug in sly to calculate width correctly
	 * https://github.com/darsain/sly/pull/248
	 * a better fix would be to fork and make a new build I guess
	 */
	recalculateWidth() {
		const itemsCount = this.sly.items && this.sly.items.length;
		const currentWidth = get(this.sly, 'slidee.style.width', null);
		if (!itemsCount || !currentWidth) {
			return null;
		}
		const newWidth = toInteger(currentWidth.replace('px', '')) + itemsCount;
		this.sly.slidee.style.width = `${newWidth}px`;
		return newWidth;
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
	config: PropTypes.object
};
