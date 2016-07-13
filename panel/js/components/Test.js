import React, {PropTypes} from 'react';
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
import renderIf from 'render-if';
import {noop} from 'lodash';



/**
 *
 */
function Test({title, instructions, applied, done, onApply, onDone, intl}) {
	const handleApplyChange = (event) =>
		onApply(event.target.checked);

	const handleDoneChange = (event) =>
		onDone(event.target.checked);

	return (
		<article className="Test">
			<header className="Test-header">
				<h2 className="Test-title">{title}</h2>

				<input
					className="Test-apply"
					type="checkbox"
					title={intl.formatMessage({
						id: 'Test.apply'
					})}
					checked={applied}
					onChange={handleApplyChange}
				/>

				<input
					className="Test-done"
					type="checkbox"
					title={intl.formatMessage({
						id: 'Test.done'
					})}
					checked={done}
					onChange={handleDoneChange}
				/>
			</header>

			{renderIf(instructions)(() => (
				<details>
					<summary>
						<FormattedMessage id="Test.instructions" />
					</summary>

					<div
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
