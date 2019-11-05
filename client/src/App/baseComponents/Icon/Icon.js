import React from 'react';

import PropTypes from 'prop-types';
import { COLORS } from '../../styles/baseColors';

import styles from './styles/index.scss';
import classNames from 'classnames';

const Icon = ({ icon, color, className, onHover, onHoverColor }) => {
	const componentClassName = classNames(
		styles.icon,
		className
	);

	console.log(onHover);
	console.log(onHoverColor);

	const iconColor = onHover ? onHoverColor : color;

	//TODO:: find better solution to prevent blincking.
	const getIconContent = () => {
		return (
			<div
				className={componentClassName}
			>
				<svg
					viewBox="0 0 24 24"
				>
					<path d={icon} fill={iconColor} />
				</svg>
			</div>
		)
	};

	return (
		getIconContent()
	);
};

Icon.defaultProps = {
	color: COLORS.DARK,
	className: '',
	onHover: false
};

Icon.propTypes = {
	icon: PropTypes.string.isRequired,
	color: PropTypes.string,
	className: PropTypes.string,
	onHover: PropTypes.bool,
};

export { Icon };
