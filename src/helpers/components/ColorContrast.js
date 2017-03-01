import React, {PropTypes} from 'react';
import {FormattedMessage} from 'react-intl';
import renderIf from 'render-if';
import classNames from 'classnames';
import ColorInput from './ColorInput';



/**
 *
 */
const ColorContrast = ({
	backgroundColor,
	color,
	fontSize,
	ratio,
	minimumRatio,
	onPickText,
	onPickColor,
	onChangeColor
}) => (
	<div className="ColorContrast Widget">
		<form className="ColorContrast-form">
			<div className="ColorContrast-row">
				<div className="Form-field">
					<label
						className="Form-label"
						htmlFor="ColorContrast-backgroundColor"
					>
						<FormattedMessage id="ColorContrast.backgroundColor" />
					</label>

					<ColorInput
						id="ColorContrast-backgroundColor"
						color={backgroundColor}
						onChange={(value) => onChangeColor('backgroundColor', value)}
						onPick={() => onPickColor('backgroundColor')}
					/>
				</div>

				<div className="Form-field">
					<label
						className="Form-label"
						htmlFor="ColorContrast-color"
					>
						<FormattedMessage id="ColorContrast.color" />
					</label>

					<ColorInput
						id="ColorContrast-color"
						color={color}
						onChange={(value) => onChangeColor('color', value)}
						onPick={() => onPickColor('color')}
					/>
				</div>
			</div>

			{/*
			<div className="Form-field">
				<label
					className="Form-label"
					htmlFor="ColorContrast-textSize"
				>
					<FormattedMessage id="ColorContrast.textSize" />
				</label>

				<input
					className="Form-input"
					id="ColorContrast-textSize"
					type="text"
					value={fontSize}
				/>
			</div>
			*/}

			<button
				className="Button"
				type="button"
				onClick={onPickText}
			>
				<FormattedMessage id="ColorContrast.pickTextButton" />
			</button>
		</form>

		<p className="ColorContrast-result">
			<FormattedMessage id="ColorContrast.ratio" />

			{renderIf(!ratio)(() => (
				<span className="ColorContrast-ratio">
					<FormattedMessage id="ColorContrast.invalidResult" />
				</span>
			))}

			{renderIf(ratio)(() => (
				<span className="ColorContrast-ratio">
					<span
						className={classNames({
							'ColorContrast-actualRatio': true,
							'ColorContrast-actualRatio--invalid': (ratio < minimumRatio)
						})}
					>
						{ratio}
					</span>
					<span> / </span>
					<span className="ColorContrast-minimumRatio">{minimumRatio}</span>
				</span>
			))}
		</p>
	</div>
);

ColorContrast.propTypes = {
	backgroundColor: PropTypes.string,
	color: PropTypes.string,
	fontSize: PropTypes.string,
	ratio: PropTypes.number,
	minimumRatio: PropTypes.number,
	onPickText: PropTypes.func,
	onPickColor: PropTypes.func,
	onChangeColor: PropTypes.func
};

export default ColorContrast;
