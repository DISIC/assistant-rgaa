import React, {PropTypes} from 'react';
import classNames from 'classnames';
import renderIf from 'render-if';
import {map, includes} from 'lodash';
import {FormattedMessage} from 'react-intl';
import {Wrapper, Button, Menu} from 'react-aria-menubutton';
import ThemesListItem from './ThemesListItem';



const icons = {
	1: 'image.png',
	2: 'application-sidebar.png',
	3: 'color.png',
	4: 'film.png',
	5: 'table.png',
	6: 'link.png',
	7: 'script-text.png',
	8: 'navigation-090.png',
	9: 'newspaper.png',
	10: 'wand.png',
	11: 'ui-toolbar.png',
	12: 'arrow-split.png',
	13: 'book-brown.png'
};

/**
 *
 */
function ThemesList({themes, activeTheme, inactiveThemes, isOpen, setOpen}) {
	return (
		<Wrapper
			className={classNames('ThemesList', {'is-open': isOpen})}
			onSelection={(href) => {
				document.location.href = href;
			}}
			onMenuToggle={(menu) => setOpen(menu.isOpen)}
			id="ThemesList-wrapper"
		>
			<Button
				tag="h2"
				className="ThemesList-title Title Title--accent ThemesList-toggle"
				id="themesMenu"
			>
				{renderIf(isOpen)(() =>
					<span aria-hidden className="ThemesList-toggleIcon">▼</span>
				)}
				{renderIf(!isOpen)(() =>
					<svg
						aria-hidden
						viewBox="0 0 24 24"
						width="24"
						height="24"
						className="ThemesList-toggleIcon Icon"
					>
						<path
							d={[
								'M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 ',
								'4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z'
							].join('')}
						/>
						<path fill="none" d="M0 0h24v24H0z" />
					</svg>
				)}
				<FormattedMessage id="ThemesList.title" />
			</Button>
			<Menu tag="ul" className="ThemesList-list">
				{map(themes, (theme) =>
					<ThemesListItem
						{...theme}
						icon={icons[theme.id]}
						isActive={activeTheme === theme.id}
						isDisabled={includes(inactiveThemes, theme.id)}
						key={theme.id}
					/>
				)}
			</Menu>
		</Wrapper>
	);
}

ThemesList.propTypes = {
	themes: PropTypes.array.isRequired,
	activeTheme: PropTypes.string,
	inactiveThemes: PropTypes.array,
	isOpen: PropTypes.bool.isRequired,
	setOpen: PropTypes.func.isRequired
};

ThemesList.defaultProps = {
	activeTheme: {
		id: null
	},
	inactiveThemes: []
};

export default ThemesList;
