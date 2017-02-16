import React, {PropTypes} from 'react';
import {FormattedMessage} from 'react-intl';



/**
 *
 */
const ColorContrastWidget = ({
	backgroundColor,
	color,
	fontSize,
	conformityAA,
	conformityAAA,
	onSelectRequest
}) => (
	<div className="ColorContrastWidget">
		<form>
			<label
				className="Form-label"
				htmlFor="ColorContrastWidget-backgroundColor"
			>
				<FormattedMessage id="ColorContrastWidget.backgroundColor" />
			</label>

			<div className="ColorContrastWidget-colorInput">
				<input
					className="Form-input"
					id="ColorContrastWidget-backgroundColor"
					type="text"
					value={backgroundColor}
				/>

				<div
					className="ColorContrastWidget-color"
					style={{backgroundColor}}
					aria-hidden="true"
				/>
			</div>

			<label
				className="Form-label"
				htmlFor="ColorContrastWidget-textColor"
			>
				<FormattedMessage id="ColorContrastWidget.textColor" />
			</label>

			<div className="ColorContrastWidget-colorInput">
				<input
					className="Form-input"
					id="ColorContrastWidget-textColor"
					type="text"
					value={color}
				/>

				<div
					className="ColorContrastWidget-color"
					style={{backgroundColor: color}}
					aria-hidden="true"
				/>
			</div>

			<label
				className="Form-label"
				htmlFor="ColorContrastWidget-textSize"
			>
				<FormattedMessage id="ColorContrastWidget.textSize" />
			</label>

			<input
				className="Form-input"
				id="ColorContrastWidget-textSize"
				type="text"
				value={fontSize}
			/>

			<button type="button" onClick={onSelectRequest}>
				Pipette
			</button>
		</form>

		<p className="ColorContrastWidget-conformity">
			<FormattedMessage
				id="ColorContrastWidget.conformity"
				values={{
					grade: 'AA',
					conformity: conformityAA
				}}
			/>
		</p>

		<p className="ColorContrastWidget-conformity">
			<FormattedMessage
				id="ColorContrastWidget.conformity"
				values={{
					grade: 'AAA',
					conformity: conformityAAA
				}}
			/>
		</p>
	</div>
);

ColorContrastWidget.propTypes = {
	backgroundColor: PropTypes.string,
	color: PropTypes.string,
	fontSize: PropTypes.string,
	conformityAA: PropTypes.bool,
	conformityAAA: PropTypes.bool,
	onSelectRequest: PropTypes.func
};

export default ColorContrastWidget;
