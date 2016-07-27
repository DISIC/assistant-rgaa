import React, {PropTypes} from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';
import classNames from 'classnames';
import {curryRight} from 'lodash';
import {compose, withState} from 'recompose';



/**
 *
 */
function TestInstructions({isOpen, setOpenState, instructions}) {
	const containerClass = classNames('TestInstructions', {
		'is-open': isOpen
	});
	const textClass = classNames('TestInstructions-text', {
		'u-hidden': !isOpen
	});

	const toggle = () =>
		setOpenState(!isOpen);

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
	setOpenState: PropTypes.func.isRequired
};

// @see https://github.com/yahoo/react-intl/issues/498#issuecomment-228672077
const injectIntlDecorator = curryRight(injectIntl);

export default compose(
	injectIntlDecorator(),
	withState('isOpen', 'setOpenState', false)
)(TestInstructions);
