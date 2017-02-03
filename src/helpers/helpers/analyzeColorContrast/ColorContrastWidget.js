import React, {PropTypes} from 'react';
import {verifyContrastRatio} from 'wcag-contrast-verifier/lib/wcag';



/**
 *
 */
const ColorContrastWidget = ({backgroundColor, color, fontSize, fontWeight, onSelectRequest}) => {
	const {WCAG_AA, WCAG_AAA} = verifyContrastRatio(backgroundColor, color, fontSize);

	return (
		<div className="rgaaExt-ColorContrastWidget">
			<form>
				<label className="Form-label">Couleur du fond</label>
				<input type="text" value={backgroundColor} style={{backgroundColor}} />

				<label className="Form-label">Couleur du texte</label>
				<input type="text" value={color} style={{backgroundColor: color}} />

				<label className="Form-label">Taille du texte</label>
				<input type="text" value={fontSize} />

				<label className="Form-label">Graisse du texte</label>
				<input type="text" value={fontWeight} />

				<button type="button" onClick={onSelectRequest}>
					Pipette
				</button>

				<p style={{color: '#fff', backgroundColor: WCAG_AA ? '#0f0' : '#f00'}}>
					AA
				</p>

				<p style={{color: '#fff', backgroundColor: WCAG_AAA ? '#0f0' : '#f00'}}>
					AAA
				</p>
			</form>
		</div>
	);
};

ColorContrastWidget.propTypes = {
	backgroundColor: PropTypes.string,
	color: PropTypes.string,
	fontSize: PropTypes.string,
	fontWeight: PropTypes.string,
	onSelectRequest: PropTypes.func
};

export default ColorContrastWidget;
