import React, {PropTypes} from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';
import classNames from 'classnames';



/**
 *
 */
function TestInstructions({id, isOpen, onToggleRequest, instructions}) {
	const containerClass = classNames('TestInstructions', 'TestSection', {
		'is-open': isOpen
	});
	const textClass = classNames('TestSection-body', {
		'u-hidden': !isOpen
	});

	const toggle = () =>
		onToggleRequest(!isOpen);

	return (
		<div className={containerClass}>
			<h3 className="TestSection-header">
				<button
					type="button"
					className="TestSection-title TestSection-toggle InvisibleButton"
					onClick={toggle}
					aria-expanded={isOpen}
					aria-controls={`TestInstructions-${id}`}
				>
					<FormattedMessage id="Test.instructions" />
				</button>
			</h3>

			<div
				id={`TestInstructions-${id}`}
				className={textClass}
				// eslint-disable-next-line react/no-danger
				dangerouslySetInnerHTML={{
					__html: instructions
				}}
			/>
		</div>
	);
}

TestInstructions.propTypes = {
	id: PropTypes.string.isRequired,
	instructions: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
	onToggleRequest: PropTypes.func.isRequired
};



export default injectIntl(TestInstructions);
