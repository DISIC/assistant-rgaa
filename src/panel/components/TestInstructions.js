import React, {PropTypes} from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';
import classNames from 'classnames';



/**
 *
 */
function TestInstructions({isOpen, onToggleRequest, instructions}) {
	const containerClass = classNames('TestInstructions', {
		'is-open': isOpen
	});
	const textClass = classNames('TestInstructions-text', {
		'u-hidden': !isOpen
	});

	const toggle = () =>
		onToggleRequest(!isOpen);

	return (
		<div className={containerClass}>
			<h3 className="TestInstructions-title">
				<button
					type="button"
					className="TestInstructions-toggle InvisibleButton"
					onClick={toggle}
				>
					<FormattedMessage id="Test.instructions" />
				</button>
			</h3>

			<div
				className={textClass}
				dangerouslySetInnerHTML={{
					__html: instructions
				}}
			/>
		</div>
	);
}

TestInstructions.propTypes = {
	instructions: PropTypes.string,
	isOpen: PropTypes.bool.isRequired,
	onToggleRequest: PropTypes.func.isRequired
};



export default injectIntl(TestInstructions);
