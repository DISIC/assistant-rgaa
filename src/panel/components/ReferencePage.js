import React, {Component, PropTypes} from 'react';
import {map, noop, debounce} from 'lodash';
import ThemesListContainer from './ThemesListContainer';
import ThemeContainer from './ThemeContainer';



/**
 *
 */
export default class ReferencePage extends Component {
	constructor(props) {
		super(props);
		this.bindThemes = this.bindThemes.bind(this);
		this.onScroll = debounce(this.props.onScroll, 500);
	}

	componentDidMount() {
		if (!this.themesElement) {
			return;
		}

		if (this.props.initialScrollPosition) {
			this.themesElement.scrollTop = this.props.initialScrollPosition;
		}

		this.themesElement.addEventListener('scroll', this.onScroll, false);
	}

	componentWillUnmount() {
		if (!this.themesElement) {
			return;
		}

		this.themesElement.removeEventListener('scroll', this.onScroll, false);
	}

	bindThemes(domElement) {
		this.themesElement = domElement;
	}

	render() {
		return (
			<div className="ReferencePage">
				<ThemesListContainer />
				<div
					ref={this.bindThemes}
					className="ReferencePage-themes"
				>
					{map(this.props.themes, (theme, n) =>
						<ThemeContainer key={n} theme={theme} />
					)}
				</div>
			</div>
		);
	}
}



ReferencePage.propTypes = {
	themes: PropTypes.array.isRequired,
	initialScrollPosition: PropTypes.number.isRequired,
	onScroll: PropTypes.func
};

ReferencePage.defautProps = {
	onScroll: noop
};
