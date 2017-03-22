import React, {PropTypes, Component} from 'react';
import {DraggableCore} from 'react-draggable';
import {includes, assign, upperFirst, isEqual, omit, bindAll} from 'lodash';
import classNames from 'classnames';
import renderIf from 'render-if';



const defaultStyles = {
	container: {
		position: 'relative'
	},
	handle: {
		position: 'absolute',
		display: 'block',
		margin: 'auto',
		padding: 0,
		border: 0,
		background: '#ccc',
		cursor: 'col-resize',
		zIndex: 50
	},
	overlay: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		margin: 'auto',
		padding: 0,
		zIndex: 55,
		width: '100%',
		height: '100%'
	},
	// all "handle<Position>" styles are merged with "handle" styles for the given position
	handleLeft: {
		left: '-8px',
		right: 'auto',
		top: 0,
		bottom: 0,
		width: '8px'
	},
	handleRight: {
		left: 'auto',
		right: '-8px',
		top: 0,
		bottom: 0,
		width: '8px'
	},
	handleTop: {
		left: 0,
		right: 0,
		top: '-8px',
		bottom: 'auto',
		height: '8px',
		cursor: 'row-resize'
	},
	handleBottom: {
		left: 0,
		right: 0,
		top: '-auto',
		bottom: '8px',
		height: '8px',
		cursor: 'row-resize'
	}
};



/**
 *
 */
class ResizeHandle extends Component {
	constructor(props) {
		super(props);
		this.state = {
			length: null,
			lengthProperty: this.lengthProperty(props.position),
			dragging: false,
			folded: false
		};

		bindAll(this, 'onDrag', 'onDragStop');
	}

	componentDidMount() {
		this.setState({ // eslint-disable-line react/no-did-mount-set-state
			length: this.getContainerLength()
		});
	}

	componentWillReceiveProps({position: newPosition}) {
		const newLengthProperty = this.lengthProperty(newPosition);
		if (newLengthProperty === this.state.lengthProperty) {
			return;
		}

		this.setState({
			lengthProperty: newLengthProperty
		});
	}

	onDrag(event, {deltaX, deltaY}) {
		// set dragging state onDrag and not onDragStart because when only clicking
		// then handle, we pass in onDragStart but not on onDrag.
		// So, we think we start dragging when doing a normal click because
		// we pass in onDragStart, but we're actually not dragging until a onDrag event is sent
		if (!this.state.dragging) {
			this.setState({
				dragging: true
			});
		}

		let value = this.state.lengthProperty === 'width' ? deltaX : deltaY;
		if (value === 0) {
			return;
		}
		if (includes(['left', 'top'], this.props.position)) {
			value = value * -1;
		}
		this.setState({
			length: this.state.length + value
		});
	}

	onDragStop(event, ui) {
		const justAClick = !this.state.dragging;

		if (justAClick && this.props.foldOnClick) {
			return this.toggleFolding(event, ui);
		}

		return this.setState({
			dragging: false
		});
	}

	getContainerLength() {
		const rect = this.refs.container.getBoundingClientRect();
		return rect[this.state.lengthProperty];
	}

	lengthProperty(position) {
		return includes(['left', 'right'], position)
			? 'width'
			: 'height';
	}

	toggleFolding() {
		if (!this.props.foldOnClick) {
			return false;
		}

		const wantToFold = !this.state.folded;
		if (wantToFold) {
			return this.setState({
				beforeFold: omit(this.state, 'beforeFold', 'folded'),
				length: 0,
				folded: true
			});
		}

		return this.setState({
			...this.state.beforeFold,
			beforeFold: {},
			folded: false
		});
	}

	render() {
		const {classes, styles, position, useOverlay, children} = this.props;
		const defaultClasses = ResizeHandle.defaultProps.classes;

		const containerStyles = isEqual(classes.container, defaultClasses.container)
			? assign({}, defaultStyles.container, styles.container)
			: {};
		const containerClasses = classNames(classes.container, {
			[`${classes.container}--${position}`]: true,
			[`${classes.container}--dragging`]: this.state.dragging,
			[`${classes.container}--folded`]: this.state.folded
		});
		const handleStyles = isEqual(classes.handle, defaultClasses.handle)
			? assign(
				{},
				defaultStyles.handle,
				defaultStyles[`handle${upperFirst(position)}`],
				styles.handle
			)
			: {};
		const overlayStyles = useOverlay && isEqual(classes.overlay, defaultClasses.overlay)
			? assign({}, defaultStyles.overlay, styles.overlay)
			: {};

		containerStyles[this.state.lengthProperty] = `${this.state.length}px`;

		return (
			<div ref="container" style={containerStyles} className={containerClasses}>
				{children}
				<DraggableCore
					offsetParent={document.body}
					onDrag={this.onDrag}
					onStop={this.onDragStop}
					{...this.props.draggableProps}
				>
					<div
						className={classes.handle}
						style={handleStyles}
						{...this.props.handleProps}
					/>
				</DraggableCore>
				{renderIf(useOverlay && this.state.dragging)(() =>
					<div
						className={classes.overlay}
						style={overlayStyles}
					/>
				)}
			</div>
		);
	}
}

export default ResizeHandle;

ResizeHandle.propTypes = {
	position: PropTypes.oneOf(['left', 'right', 'top', 'bottom']).isRequired,
	useOverlay: PropTypes.bool,
	foldOnClick: PropTypes.bool,
	styles: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	children: PropTypes.element.isRequired,
	draggableProps: PropTypes.object,
	handleProps: PropTypes.object
};

ResizeHandle.defaultProps = {
	position: 'right',
	useOverlay: false,
	foldOnClick: false,
	classes: {
		container: 'rgaaExt-ResizeHandle',
		handle: 'rgaaExt-ResizeHandle-handle',
		overlay: 'rgaaExt-ResizeHandle-overlay'
	},
	styles: {
		container: {},
		handle: {},
		overlay: {}
	}
};
