import React, {PropTypes} from 'react';
import {injectIntl, intlShape} from 'react-intl';
import renderIf from 'render-if';
import {noop} from 'lodash';
import TestInstructions from './TestInstructions';
import TestHelpersContainer from './TestHelpersContainer';



/**
 *
 */
function Test({id, title, instructions, applied, done, onApply, onDone, intl}) {
	const handleApplyChange = (event) =>
		onApply(event.target.checked);

	const handleDoneChange = (event) =>
		onDone(event.target.checked);

	const applyImage = applied ? 'cross.png' : 'magnifier-zoom.png';
	const applyTranslateKey = applied ? 'uncheck' : 'check';

	const htmlTitle = title.replace(
		/^(Test \d+\.\d+\.\d+)(\s?:\s?)(.*)$/i,
		'<span class="Test-id">$1</span>$2<span class="Test-description">$3</span>'
	);

	return (
		<article className="Test">
			<header className="Test-header">
				<h2 className="Test-title">
					<div
						dangerouslySetInnerHTML={{
							__html: htmlTitle
						}}
					/>
				</h2>

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
							checked={applied}
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

			{renderIf(applied)(() => (
				<TestHelpersContainer id={id} />
			))}

			{renderIf(instructions)(() => (
				<TestInstructions instructions={instructions} />
			))}
		</article>
	);
}

Test.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	instructions: PropTypes.string,
	applied: PropTypes.bool,
	done: PropTypes.bool,
	onApply: PropTypes.func,
	onDone: PropTypes.func,
	intl: intlShape.isRequired
};

Test.defaultProps = {
	applied: false,
	done: false,
	onApply: noop,
	onDone: noop
};

export default injectIntl(Test);
