import React, {PropTypes} from 'react';
import classNames from 'classnames';
import {FormattedMessage, intlShape, injectIntl} from 'react-intl';
import {describe, info, component} from '../../helpers/api/helpers';



/**
 *
 */
function TestHelpers({id, helpers, isOpen, onToggleRequest, intl}) {
	const containerClass = classNames('TestHelpers', 'TestSection', {
		'is-open': isOpen
	});
	const contentClass = classNames('TestSection-body', {
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
					aria-controls={`TestHelpers-${id}`}
				>
					<FormattedMessage id="TestHelpers.title" />
				</button>
			</h3>

			<div id={`TestHelpers-${id}`} className={contentClass}>
				<ol>
					{helpers.map((helper, i) => (
						<li
							key={i}
							dangerouslySetInnerHTML={{
								__html: describe(intl, helper)
							}}
						/>
					))}
				</ol>
			</div>

			<div className="TestSection-body">
				{/* show helper widgets if any */}
				{helpers
					.map((config, i) => {
						const {args} = info(config);
						const Helper = component(config);

						return Helper
							? <Helper key={i} args={args} />
							: null;
					})
					.filter((helper) =>
						!!helper
					)
				}
			</div>
		</div>
	);
}

TestHelpers.propTypes = {
	id: PropTypes.string.isRequired,
	helpers: PropTypes.array.isRequired,
	isOpen: PropTypes.bool.isRequired,
	onToggleRequest: PropTypes.func.isRequired,
	intl: intlShape.isRequired
};



export default injectIntl(TestHelpers);
