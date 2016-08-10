import React, {Component, PropTypes} from 'react';
import {debounce, omit, get, toInteger, isEqual, find} from 'lodash';
require('sly/dist/sly');



/**
 *
 */
export default class Slyct extends Component {
	componentDidMount() {
		this.sly = new Sly(this.refs.sly, this.props.config); // eslint-disable-line no-undef

		this.isControlled = this.sly.options.activateOn === null;

		this.sly.on('load', this.recalculateWidth.bind(this));

		this.debouncedReload = debounce(() => (
			this.sly && this.sly.reload()
		), 100);
		window.addEventListener('resize', this.debouncedReload, true);

		this.sly.init();

		if (this.isControlled) {
			this.activateControlledItem();
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.rawData === undefined) {
			return;
		}

		if (!isEqual(this.props.rawData, prevProps.rawData)) {
			this.sly.reload();
		}

		if (this.isControlled) {
			this.activateControlledItem();
		}
	}

	componentWillUnmount() {
		this.sly.destroy();
		window.removeEventListener('resize', this.debouncedReload);
	}

	getContainerProps() {
		return omit(this.props, 'children', 'rawData', 'config');
	}

	getSlyInstance() {
		return this.sly;
	}

	findControlledItem() {
		const domNodes = this.sly.items.map(({el}) => el);
		return find(domNodes, (node) => node.dataset.slyctActiveItem === '');
	}

	activateControlledItem() {
		const activeItem = this.findControlledItem();
		if (activeItem) {
			this.sly.activate(activeItem);
		}
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

Slyct.propTypes = {
	/**
	 * react or dom elements to show in the sly frame
	 */
	children: PropTypes.arrayOf(PropTypes.element).isRequired,
	/**
	 * Optionally pass a rawData array,
	 * representing the … data tied to the children.
	 * This is usefull to check if data actually changed from
	 * one render to another
	 */
	rawData: PropTypes.array,
	config: PropTypes.object
};

Slyct.defaultProps = {
	config: {}
};
