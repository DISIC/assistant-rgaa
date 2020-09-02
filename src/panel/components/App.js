import React, {PropTypes} from 'react';
import classNames from 'classnames';
import HeaderContainer from './HeaderContainer';
import AppToggle from './AppToggle';



/**
 *
 */
export default function App({folded, onUnfoldRequest, children}) {
	return (
		<div className="App">
			<div
				className={classNames({
					'App-content': true,
					'is-hidden': folded
				})}
			>
				<HeaderContainer />
				{children}
			</div>

			<div
				className={classNames({
					'App-toggle': true,
					'is-hidden': !folded
				})}
			>
				<AppToggle onClick={onUnfoldRequest} />
			</div>
		</div>
	);
}

App.propTypes = {
	children: PropTypes.element,
	folded: PropTypes.bool.isRequired,
	onUnfoldRequest: PropTypes.func.isRequired
};

App.defaultProps = {
	children: undefined
};
