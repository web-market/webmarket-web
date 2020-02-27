import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

import CategoriesListItemTooltipActions from './CategoriesListItemTooltipActions';
import Icon from '../../../../baseComponents/Icon';

import ClassNames from 'classnames';
import classes from './styles/index.scss';
import { chevronDown, chevronUp } from '../../../../icons';
import { COLORS } from '../../../../styles/baseColors';
import { getUniqueKey, isNull } from '../../../../utils';
import { getSubCategories } from '../../api';

const CategoriesListItem = (
	{
		category,
		handleEditCategory,
		handleDeleteCategory
	}
	) => {
	const [showCategories, setShowCategories] = useState(false);
	const [subCategories, setSubCategories] = useState(null);
	const [hasFetched, setHasFetched] = useState(false);
	const [subCategoryHeight, setSubCategoryHeight] = useState(false);

	const subCategoryRef = useRef(null);

	const handleParentCategories = (e) => {
		e.stopPropagation();

		if (category.hasSubCategories) {
			setShowCategories(!showCategories);
		}
	};

	const handleGetSubCategories = useCallback(() => {
		getSubCategories(category.id)
			.then(({ data }) => {
				setSubCategories(data);
				setHasFetched(true);
			});
	}, [category.id]);

	useEffect(() => {
		if (!hasFetched && showCategories) {
			handleGetSubCategories();
		}
	}, [showCategories, hasFetched, handleGetSubCategories]);

	const componentClassName = ClassNames(
		classes.category_item,
		{
			[classes.category_item__hasChild]: category.hasSubCategories
		}
	);

	useEffect(() => {
		let h;

		if (isNull(subCategoryRef.current)) {
			h = 0;
		} else {
			const { height: subCategoryHeight } = subCategoryRef.current.getBoundingClientRect();

			h = subCategoryHeight + 50;
		}

		setSubCategoryHeight(h);
	}, [showCategories]);

	const categoryItemDetail = () => {
		return (

				<div className={classes.category_item_detail}>
					<div className={classes.category_item_labelSection}>
						{
							category.hasSubCategories && (
								<div
									className={classes.category_item_labelBadge}
									style={{
										backgroundColor: category.color,
										height: subCategoryHeight
									}}
								>
								</div>
							)
						}
						{category.name}
					</div>
					<div className={classes.category_item_actionSection}>
						{
							category.hasSubCategories && (
								<Icon
									icon={showCategories ? chevronUp : chevronDown}
									color={COLORS.FIELD_ICON}
									onClick={handleParentCategories}
									className={classes.category_item_collapseButton}
								/>
							)
						}
						<CategoriesListItemTooltipActions
							id={category.id}
							handleEditCategory={handleEditCategory}
							handleDeleteCategory={handleDeleteCategory}
						/>
					</div>
				</div>
		);
	};

	const subCategoryItemDetail = () => {
		return subCategories.map((category, index) => {
			const key = getUniqueKey(category.name, index);

			return (
				<CategoriesListItem
					key={key}
					category={category}
					handleDeleteCategory={handleDeleteCategory}
					handleEditCategory={handleEditCategory}
				/>
			);
		});
	};

	return (
		<div className={componentClassName}>
			{categoryItemDetail()}
			{
				showCategories && !isNull(subCategories) && (
					<div
						ref={subCategoryRef}
						className={classes.category_item_subCategoryItem}
					>
						{subCategoryItemDetail()}
					</div>
				)
			}
		</div>
	);
};

CategoriesListItem.propTypes = {
	category: PropTypes.object.isRequired,
	handleDeleteCategory: PropTypes.func.isRequired,
	handleEditCategory: PropTypes.func.isRequired,
};

export default CategoriesListItem;