import React, {PropTypes} from 'react';
import renderIf from 'render-if';
import classNames from 'classnames';



/**
 *
 */
export default function Icon({name, title, className, spritePath, ...props}) {
	const svgProps = {...props};
	if (title) {
		svgProps.role = 'img';
		svgProps['aria-label'] = title;
	} else {
		svgProps['aria-hidden'] = true;
	}
	return (
		<svg
			className={classNames('Icon', `Icon--${name}`, className)}
			{...svgProps}
		>
			{renderIf(title)(() =>
				<desc>{title}</desc>
			)}
			<use xlinkHref={`${spritePath}#${name}`} />
		</svg>
	);
}

Icon.propTypes = {
	spritePath: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	className: PropTypes.string,
	title: PropTypes.string
};

Icon.defaultProps = {
	spritePath: '/dist/icons.svg',
	className: undefined,
	title: undefined
};
