import React, {PropTypes, Component} from 'react';
import {DraggableCore} from 'react-draggable';
import {isNumber, includes, assign, upperFirst, isEqual, omit, bindAll} from 'lodash';
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
			folded: props.folded
		};

		bindAll(this, 'onDrag', 'onDragStop');
	}

	componentDidMount() {
		if (this.props.enabled) {
			this.setState({ // eslint-disable-line react/no-did-mount-set-state
				length: this.getContainerLength()
			});
		}
	}

	componentWillReceiveProps({position: newPosition, folded: newFolded}) {
		if (!this.props.enabled) {
			return;
		}

		const newLengthProperty = this.lengthProperty(newPosition);
		if (newLengthProperty === this.state.lengthProperty) {
			return;
		}

		if (newFolded !== this.state.folded) {
			this.toggleFolding();
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
			value *= -1;
		}
		this.setState({
			length: this.state.length + value
		});
	}

	onDragStop() {
		const justAClick = !this.state.dragging;

		if (justAClick && this.props.onToggleFoldRequest) {
			return this.props.onToggleFoldRequest(this.state.folded);
		}

		if (justAClick && this.props.foldOnClick) {
			return this.toggleFolding();
		}

		return this.setState({
			dragging: false
		});
	}

	getContainerLength() {
		// eslint-disable-next-line react/no-string-refs
		const rect = this.refs.container.getBoundingClientRect();
		return rect[this.state.lengthProperty];
	}

	// eslint-disable-next-line class-methods-use-this
	lengthProperty(position) {
		return includes(['left', 'right'], position)
			? 'width'
			: 'height';
	}

	toggleFolding() {
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
		const {classes, styles, position, useOverlay, enabled, children} = this.props;
		const defaultClasses = ResizeHandle.defaultProps.classes;

		const containerStyles = isEqual(classes.container, defaultClasses.container)
			? assign({}, defaultStyles.container, styles.container)
			: {};
		const containerClasses = classNames(classes.container, {
			[`${classes.container}--${position}`]: true,
			[`${classes.container}--dragging`]: this.state.dragging,
			[`${classes.container}--folded`]: this.state.folded,
			[`${classes.container}--enabled`]: enabled
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

		if (isNumber(this.state.length)) {
			containerStyles[this.state.lengthProperty] = `${this.state.length}px`;
		}

		if (!enabled) {
			return (
				<div className={classes.disabledContainer}>
					{children}
				</div>
			);
		}

		return (
			// eslint-disable-next-line react/no-string-refs
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
				{renderIf(useOverlay && this.state.dragging)(() => (
					<div
						className={classes.overlay}
						style={overlayStyles}
					/>
				))}
			</div>
		);
	}
}

export default ResizeHandle;

ResizeHandle.propTypes = {
	position: PropTypes.oneOf(['left', 'right', 'top', 'bottom']).isRequired,
	useOverlay: PropTypes.bool,
	foldOnClick: PropTypes.bool,
	folded: PropTypes.bool,
	enabled: PropTypes.bool.isRequired,
	onToggleFoldRequest: PropTypes.func,
	styles: PropTypes.shape({
		container: PropTypes.object,
		handle: PropTypes.object,
		overlay: PropTypes.object
	}).isRequired,
	classes: PropTypes.shape({
		container: PropTypes.string,
		disabledContainer: PropTypes.string,
		handle: PropTypes.string,
		overlay: PropTypes.string
	}).isRequired,
	children: PropTypes.element.isRequired,
	// eslint-disable-next-line react/forbid-prop-types
	draggableProps: PropTypes.object,
	// eslint-disable-next-line react/forbid-prop-types
	handleProps: PropTypes.object
};

ResizeHandle.defaultProps = {
	position: 'right',
	useOverlay: false,
	foldOnClick: false,
	folded: false,
	onToggleFoldRequest: undefined,
	classes: {
		container: 'rgaaExt-ResizeHandle',
		disabledContainer: 'rgaaExt-DisabledResizeHandle',
		handle: 'rgaaExt-ResizeHandle-handle',
		overlay: 'rgaaExt-ResizeHandle-overlay'
	},
	styles: {
		container: {},
		handle: {},
		overlay: {}
	},
	draggableProps: {},
	handleProps: {}
};
