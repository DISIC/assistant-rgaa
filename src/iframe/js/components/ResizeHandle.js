import React, {PropTypes, Component} from 'react';
import {DraggableCore} from 'react-draggable';
import {includes, assign, upperFirst, isEqual} from 'lodash';
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
		cursor: 'ew-resize',
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
		left: '-6px',
		right: 'auto',
		top: 0,
		bottom: 0,
		width: '6px'
	},
	handleRight: {
		left: 'auto',
		right: '-6px',
		top: 0,
		bottom: 0,
		width: '6px'
	},
	handleTop: {
		left: 0,
		right: 0,
		top: '-6px',
		bottom: 'auto',
		height: '6px',
		cursor: 'ns-resize'
	},
	handleBottom: {
		left: 0,
		right: 0,
		top: '-auto',
		bottom: '6px',
		height: '6px',
		cursor: 'ns-resize'
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
			dragging: false
		};

		this.onDrag = this.onDrag.bind(this);
		this.onDragStart = this.onDragStart.bind(this);
		this.onDragStop = this.onDragStop.bind(this);
	}

	componentDidMount() {
		const rect = this.refs.container.getBoundingClientRect();
		this.setState({ // eslint-disable-line react/no-did-mount-set-state
			length: rect[this.state.lengthProperty]
		});
	}

	componentWillReceiveProps({position: newPosition}) {
		this.setState({
			lengthProperty: this.lengthProperty(newPosition)
		});
	}

	onDragStart() {
		this.setState({
			dragging: true
		});
	}

	onDrag(event, {deltaX, deltaY}) {
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

	onDragStop() {
		this.setState({
			dragging: false
		});
	}

	lengthProperty(position) {
		return includes(['left', 'right'], position)
			? 'width'
			: 'height';
	}

	render() {
		const {classes, styles, position, useOverlay, children} = this.props;
		const defaultClasses = ResizeHandle.defaultProps.classes;

		const containerStyles = isEqual(classes.container, defaultClasses.container)
			? assign({}, defaultStyles.container, styles.container)
			: {};
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
			<div ref="container" style={containerStyles} className={classes.container}>
				{children}
				<DraggableCore
					onDrag={this.onDrag}
					offsetParent={document.body}
					onStart={this.onDragStart}
					onStop={this.onDragStop}
					{...this.props.draggableProps}
				>
					<div
						className={classes.handle}
						style={handleStyles}
					></div>
				</DraggableCore>
				{renderIf(this.state.dragging)(
					<div
						className={classes.overlay}
						style={overlayStyles}
					></div>
				)}
			</div>
		);
	}
}

export default ResizeHandle;

ResizeHandle.propTypes = {
	position: PropTypes.oneOf(['left', 'right', 'top', 'bottom']).isRequired,
	useOverlay: PropTypes.bool,
	styles: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	children: PropTypes.element.isRequired,
	draggableProps: PropTypes.object
};

ResizeHandle.defaultProps = {
	position: 'right',
	useOverlay: false,
	classes: {
		container: 'vt-ResizeHandle',
		handle: 'vt-ResizeHandle-handle',
		overlay: 'vt-ResizeHandle-overlay',
		child: 'vt-ResizeHandle-element'
	},
	styles: {
		container: {},
		handle: {},
		overlay: {}
	}
};
