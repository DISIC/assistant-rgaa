import React, {PropTypes} from 'react';
import {FormattedMessage} from 'react-intl';
import renderIf from 'render-if';
import classNames from 'classnames';



/**
 *
 */
const ColorContrastResult = ({ratio, minimumRatio}) => (
	<p className="ColorContrastResult">
		<FormattedMessage id="ColorContrastResult.ratio" />

		{renderIf(!ratio)(() => (
			<span className="ColorContrastResult-ratio">
				<FormattedMessage id="ColorContrastResult.invalidResult" />
			</span>
		))}

		{renderIf(ratio)(() => (
			<span className="ColorContrastResult-ratio">
				<span
					className={classNames({
						'ColorContrastResult-actualRatio': true,
						'ColorContrastResult-actualRatio--invalid': (ratio < minimumRatio)
					})}
				>
					{ratio}
				</span>
				<span> / </span>
				<span className="ColorContrastResult-minimumRatio">
					{minimumRatio}
				</span>
			</span>
		))}
	</p>
);

ColorContrastResult.propTypes = {
	ratio: PropTypes.number.isRequired,
	minimumRatio: PropTypes.number.isRequired
};

export default ColorContrastResult;
