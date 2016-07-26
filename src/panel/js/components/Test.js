import React, {PropTypes} from 'react';
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
import renderIf from 'render-if';
import {noop, random} from 'lodash';



/**
 *
 */
function Test({id, title, instructions, helpers, applied, done, onApply, onDone, intl}) {

	const handleApplyChange = (event) =>
		onApply(event.target.checked, helpers);

	const handleDoneChange = (event) =>
		onDone(event.target.checked);

	const randomApplied = random(0, 1, false); // for testing while applied is not implemented

	const applyImage = randomApplied ? 'prohibition.png' : 'magnifier-zoom.png';
	const applyTranslateKey = randomApplied ? 'uncheck' : 'check';

	return (
		<article className="Test">
			<header className="Test-header">
				<h2 className="Test-title">{title}</h2>

				<div className="Test-actions">
					<div className="Test-action Test-action---apply">
						<label
							htmlFor={`test-${id}-apply-input`}
							className="Test-actionLabel"
							title={intl.formatMessage({
								id: `Test.apply.${applyTranslateKey}.title`
							})}
						>
							<img
								src={`/img/${applyImage}`}
								alt={intl.formatMessage({
									id: `Test.apply.${applyTranslateKey}.alt`
								})}
							/>
						</label>
						<input
							className="Test-actionInput u-hidden"
							type="checkbox"
							id={`test-${id}-apply-input`}
							checked={randomApplied}
							onChange={handleApplyChange}
						/>
					</div>

					<div className="Test-action Test-action---done">
						<input
							className="Test-actionInput"
							type="checkbox"
							title={intl.formatMessage({
								id: 'Test.done'
							})}
							checked={done}
							onChange={handleDoneChange}
						/>
					</div>
				</div>
			</header>

			{renderIf(instructions)(() => (
				<details className="Test-instructions">
					<summary className="Test-instructionsTitle">
						<FormattedMessage id="Test.instructions" />
					</summary>

					<div
						className="Test-instructionsText"
						dangerouslySetInnerHTML={{
							__html: instructions
						}}
					/>
				</details>
			))}
		</article>
	);
}

Test.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	instructions: PropTypes.string,
	helpers: PropTypes.array,
	applied: PropTypes.bool,
	done: PropTypes.bool,
	onApply: PropTypes.func,
	onDone: PropTypes.func,
	intl: intlShape.isRequired
};

Test.defaultProps = {
	helpers: [],
	applied: false,
	done: false,
	onApply: noop,
	onDone: noop
};

export default injectIntl(Test);
