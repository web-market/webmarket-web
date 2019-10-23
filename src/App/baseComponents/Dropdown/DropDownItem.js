import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles/index.scss';

const DropDownItem = ({ value, id, handleItemClick }) => {
	return (
		<div
			onClick={() => handleItemClick(id)}
			className={styles.dropdownItem}
		>
			{value}
		</div>
	);
};

DropDownItem.defaultProps = {};

DropDownItem.propTypes = {
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
	id: PropTypes.number,
	handleItemClick: PropTypes.func,
};

export default DropDownItem;