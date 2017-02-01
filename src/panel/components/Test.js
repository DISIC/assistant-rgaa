import React, {PropTypes} from 'react';
import {injectIntl, intlShape} from 'react-intl';
import renderIf from 'render-if';
import classNames from 'classnames';
import {noop} from 'lodash';
import Icon from './Icon';
import TestInstructions from './TestInstructions';
import TestHelpersContainer from './TestHelpersContainer';



/**
 *
 */
function Test({
	id, title, instructions, importResult, applicable, applied,
	done, onApply, onDone, intl
}) {
	const handleApplyChange = (event) =>
		onApply(event.target.checked);

	const handleDoneChange = (event) =>
		onDone(event.target.checked);

	const applyImage = applied ? 'cross.png' : 'magnifier-zoom.png';
	const applyTranslateKey = applied ? 'uncheck' : 'check';

	const htmlTitle = title.replace(
		/^(Test \d+\.\d+\.\d+)\s?:\s?(.*)$/i,
		'<span class="Test-id">$1</span><span class="Test-description">$2</span>'
	);

	return (
		<article className="Test">
			<header className="Test-header">
				<p
					className="Test-title"
					dangerouslySetInnerHTML={{
						__html: htmlTitle
					}}
				/>

				<div className="Test-actions">
					{renderIf(importResult)(() => (
						<div className="Test-action Test-action---import">
							<span
								className="ImportResult"
								data-import-result={importResult}
								title={intl.formatMessage({
									id: `ImportResult.${importResult}.title`
								})}
							>
								{importResult}
							</span>
						</div>
					))}

					{renderIf(applicable)(() => (
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
					))}

					<div
						className={classNames('Test-action Test-action--done', {
							'Test-action--checked': done
						})}
					>
						<label
							htmlFor={`test-${id}-done-input`}
							className="Test-actionLabel"
							title={intl.formatMessage({
								id: done ? 'Test.done' : 'Test.todo'
							})}
						>
							<Icon name="flag" />
						</label>
						<input
							className="Test-actionInput u-hidden"
							type="checkbox"
							id={`test-${id}-done-input`}
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
	importResult: PropTypes.string,
	applicable: PropTypes.bool,
	applied: PropTypes.bool,
	done: PropTypes.bool,
	onApply: PropTypes.func,
	onDone: PropTypes.func,
	intl: intlShape.isRequired
};

Test.defaultProps = {
	applicable: false,
	applied: false,
	done: false,
	importResult: '',
	onApply: noop,
	onDone: noop
};

export default injectIntl(Test);
