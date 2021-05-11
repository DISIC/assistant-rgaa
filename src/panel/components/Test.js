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
	areInstructionsOpen, toggleInstructions,
	done, onApply, onDone, intl
}) {
	const handleApplyChange = (event) => {
		onApply(event.target.checked);
		if (event.target.checked) {
			toggleInstructions(true);
		}
	};

	const handleDoneChange = (event) =>
		onDone(event.target.checked);

	const applyTranslateKey = applied ? 'uncheck' : 'check';
	const className = classNames({
		Test: true,
		'is-applied': applied
	});

	return (
		<article className={className}>
			<header className="Test-header">
				<div className="Test-title">
					<h4 className="Test-id">
						{intl.formatMessage({id: 'Test.title'}, {id})}
					</h4>
					<div
						className="Test-description"
						// eslint-disable-next-line react/no-danger
						dangerouslySetInnerHTML={{
							__html: title
						}}
					/>
				</div>

				<div className="Test-actions">
					{renderIf(importResult)(() => (
						<div className="Test-action Test-action---import">
							<span
								className="Label ImportResult"
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
							<input
								title={intl.formatMessage({
									id: `Test.apply.${applyTranslateKey}.title`
								}, {id})}
								className="Test-actionInput"
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

			{renderIf(instructions)(() => (
				<TestInstructions
					id={id}
					instructions={instructions}
					isOpen={areInstructionsOpen}
					onToggleRequest={toggleInstructions}
				/>
			))}

			{renderIf(applied)(() => (
				<TestHelpersContainer id={id} />
			))}
		</article>
	);
}

Test.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	instructions: PropTypes.string.isRequired,
	importResult: PropTypes.string,
	applicable: PropTypes.bool,
	applied: PropTypes.bool,
	done: PropTypes.bool,
	onApply: PropTypes.func,
	onDone: PropTypes.func,
	intl: intlShape.isRequired,
	areInstructionsOpen: PropTypes.bool.isRequired,
	toggleInstructions: PropTypes.func.isRequired
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
