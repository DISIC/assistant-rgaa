import React, {Component, PropTypes} from 'react';
import {intlShape, injectIntl} from 'react-intl';
import renderIf from 'render-if';
import {get} from 'lodash';
import createColor from 'color';
import {createMessageHandler, sendMessage} from '../../common/api/runtime';
import {REQUEST_PIXEL_COLOR, REQUEST_TEXT_COLOR, REQUEST_STYLE, UPDATE_COLOR, UPDATE_STYLE} from '../actions/colorContrast';
import Icon from '../../panel/components/Icon';
import ColorContrastResult from './ColorContrastResult';
import ColorInput from './ColorInput';
import ToggleButton from './ToggleButton';



/**
 *	Shape of a color input configuration.
 */
const colorInputConfigShape = PropTypes.shape({
	label: PropTypes.string,
	pixelPicker: PropTypes.bool,
	textPicker: PropTypes.bool
});

/**
 *	Shape of a color input configuration.
 */
const extractorConfigShape = PropTypes.shape({
	label: PropTypes.string,
	left: PropTypes.string,
	right: PropTypes.string
});

/**
 *	This whole thing is VERY obscure.
 *	The communication between the widgets and the page
 *	needs a proper refactoring to be more simple and robust.
 */
class ColorContrastContainer extends Component {

	constructor(props) {
		super(props);

		this.state = {
			left: '#fff',
			right: '#fff',
			pickRequest: null,
			pickedColor: null
		};

		this.handleMessage = createMessageHandler(this.handleMessage.bind(this));
		this.handleChangeColor = this.handleChangeColor.bind(this);
		this.handlePick = this.handlePick.bind(this);
	}

	componentDidMount() {
		chrome.runtime.onMessage.addListener(this.handleMessage);
	}

	componentWillUnmount() {
		chrome.runtime.onMessage.removeListener(this.handleMessage);
	}

	get ratio() {
		try {
			const left = createColor(this.state.left);
			const right = createColor(this.state.right);
			const ratio = left.contrast(right);

			return Number(ratio.toFixed(3));
		} catch (e) {
			return 0;
		}
	}

	handleMessage({type, payload}) {
		// eslint-disable-next-line default-case
		switch (type) {
			case UPDATE_COLOR:
				this.setState({
					[this.state.pickedColor]: payload,
					pickRequest: null,
					pickedColor: null
				});
				break;

			case UPDATE_STYLE:
				this.setState({
					left: get(payload, this.props.extractor.left),
					right: get(payload, this.props.extractor.right),
					pickRequest: null,
					pickedColor: null
				});
				break;
		}
	}

	handleChangeColor(name, value) {
		this.setState({
			[name]: value
		});
	}

	handlePick(pickedColor, pickRequest) {
		this.setState({
			pickedColor,
			pickRequest
		});

		sendMessage({
			type: pickRequest
		});
	}

	renderField(name, {label, pixelPicker, textPicker}) {
		const id = `ColorField--${name}`;
		const {intl} = this.props;
		const {pickRequest, pickedColor} = this.state;

		return (
			<div className="Form-field" key={name}>
				<label className="Form-label" htmlFor={id}>
					{label}
				</label>

				<ColorInput
					id={id}
					color={this.state[name]}
					onChange={(value) =>
						this.handleChangeColor(name, value)
					}
				>
					{renderIf(pixelPicker)(() => (
						<ToggleButton
							pressed={pickedColor === name && pickRequest === REQUEST_PIXEL_COLOR}
							onPress={() =>
								this.handlePick(name, REQUEST_PIXEL_COLOR)
							}
							title={intl.formatMessage({
								id: 'ColorInput.pickPixelButton.title'
							})}
						>
							<Icon name="eyedropper" />
						</ToggleButton>
					))}

					{renderIf(textPicker)(() => (
						<ToggleButton
							pressed={pickedColor === name && pickRequest === REQUEST_TEXT_COLOR}
							onClick={() =>
								this.handlePick(name, REQUEST_TEXT_COLOR)
							}
							title={intl.formatMessage({
								id: 'ColorInput.pickTextButton.title'
							})}
						>
							<Icon name="cursor" />
						</ToggleButton>
					))}
				</ColorInput>
			</div>
		);
	}

	render() {
		const {left, right, extractor, minimumRatio} = this.props;

		return (
			<div className="ColorContrast Widget">
				<form className="Form">
					<div className="Form-row">
						{this.renderField('left', left)}
						{this.renderField('right', right)}
					</div>

					{renderIf(extractor)(() => (
						<ToggleButton
							pressed={this.state.pickRequest === REQUEST_STYLE}
							onClick={() => this.handlePick(null, REQUEST_STYLE)}
						>
							{extractor.label}
						</ToggleButton>
					))}
				</form>

				<ColorContrastResult
					ratio={this.ratio}
					minimumRatio={minimumRatio}
				/>
			</div>
		);
	}
}

ColorContrastContainer.propTypes = {
	left: colorInputConfigShape,
	right: colorInputConfigShape,
	extractor: extractorConfigShape,
	minimumRatio: PropTypes.number,
	intl: intlShape
};

export default injectIntl(ColorContrastContainer);
