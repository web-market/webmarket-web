import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../../../../../baseComponents/Modal';
import CategoriesEditCategoryModalContent from './CategoriesEditCategoryModalContent';

const CategoriesEditCategoryModal = (
	{
		handleClose,
		isOpen,
		modalData
	}
) => {
	const handleEditCategory = (values) => {
		console.log(values);
	};

	return (
		<Modal
			isOpen={isOpen}
			handleClose={handleClose}
			render={renderData => {
				return (
					<CategoriesEditCategoryModalContent
						{...renderData}
						modalData={modalData}
						handleEditCategory={handleEditCategory}
					/>
				);
			}}
		/>
	);
};


CategoriesEditCategoryModal.propTypes = {
	handleClose: PropTypes.func,
	isOpen: PropTypes.bool
};

export { CategoriesEditCategoryModal };
