import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import { isEmptyStirng, isUndefined } from '../../utils';

import DropDownItem from './DropDownItem';

import classes from './styles/index.scss';
import Icon from '../Icon';
import { chevronDown, chevronUp } from '../../icons';

import data from './dataModel';
import classNames from 'classnames';
import { COLORS } from '../../styles/baseColors';

const Dropdown = ({
					isOpen,
					items,
					placeholder,
					onFieldChange,
					multiSelect,
					initialValue
}) => {
	const [open, setOpen] = useState(false);
	const [displayValue, setDisplayValue] = useState('');

	useEffect(() => {
		setOpen(isOpen);
	}, [isOpen]);

	const toggleDropdown = useCallback(() => {
		setOpen(!open);
	}, [open]);

	const onItemSelect = useCallback((id) => {
		const selectedItem = items.find(i => i.id === id);

		setDisplayValue(selectedItem.value);

		onFieldChange(id);
	}, [items]);

	const handleItemClick = useCallback((id) => {
		onItemSelect(id);

		if (!multiSelect) {
			toggleDropdown();
		}
	}, [multiSelect, onItemSelect, toggleDropdown]);

	useEffect(() => {
		if (!isUndefined(initialValue)) onItemSelect(initialValue);
	}, [initialValue, onItemSelect]);

	const getDisplayValue = () => {
		return isEmptyStirng(displayValue)
			? <span className={classes.dropdownItem_placeholder}>{placeholder}</span>
			: displayValue;
	};

	const dropDownContainer = classNames(
		{
			[classes.dropdown_containerOpen]: open
		},
		classes.dropdown_container
	);

	return (
		<div className={classes.dropdown}>
			<div
				className={classes.dropdown_selectArea}
				onClick={toggleDropdown}
			>
				{getDisplayValue()}
				<Icon
					className={classes.dropdown_icon}
					icon={open ? chevronUp : chevronDown}
					color={COLORS.FIELD_ICON}
				/>
			</div>
			<div className={dropDownContainer}>
				{
					items.map(item => {
						return (
							<DropDownItem
								key={item.id}
								value={item.value}
								id={item.id}
								handleItemClick={handleItemClick}
							/>
						);
					})
				}
			</div>
		</div>
	);
};

Dropdown.defaultProps = {
	isOpen: false,
	multiSelect: false,
	items: data,
	placeholder: '###Select',
};

Dropdown.propTypes = {
	items: PropTypes.array,
	isOpen: PropTypes.bool,
	multiSelect: PropTypes.bool,
	placeholder: PropTypes.string,
	onFieldChange: PropTypes.func,
};

export { Dropdown };
