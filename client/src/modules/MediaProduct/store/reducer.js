import { actionLogger, removeArrayElementByValue } from '../../../utils';

import {
	SET_PENDING,
	SET_ACTIVE_CATEGORY_ID,
	SET_ACTIVE_CATEGORY_NAME,
	SET_MEDIA_PRODUCT_CATEGORIES,
	SET_SELECTED_PRODUCT_IMAGE_ID,
	DELETE_SELECTED_PRODUCT_IMAGE_ID,
	MEDIA_PRODUCT_IMAGES_GRID_LAYOUT,
	SET_HAS_MEDIA_PRODUCT_CATEGORIES
} from './consts';

//import { mediaProductsDataCategories, hasMediaProductCategories } from '../staticData';

export const initialState = {
	selectedImageIds: [],
	activeCategoryId: null,
	activeCategoryName: null,
	hasMediaProductCategories: false,
	mediaProductGrisLayout: false,
	categories: [],
	pending: false,
	images: []
};

export const reducer = (state, payload) => {
	actionLogger(payload.type, payload, SET_PENDING);

	switch (payload.type) {
		case SET_MEDIA_PRODUCT_CATEGORIES:
			return {
				...state,
				categories: [...payload.categories]
			};
		case SET_HAS_MEDIA_PRODUCT_CATEGORIES:
			return {
				...state,
				hasMediaProductCategories: payload.hasMediaProductCategories
			};
		case SET_ACTIVE_CATEGORY_ID:
			return {
				...state,
				activeCategoryId: payload.activeCategoryId
			};
		case SET_ACTIVE_CATEGORY_NAME:
			// change categories23 => state.categories
			const targetElement = state.categories.find(category => category.id === payload.activeCategoryId);

			return {
				...state,
				activeCategoryName: targetElement.name
			};
		case MEDIA_PRODUCT_IMAGES_GRID_LAYOUT:
			return {
				...state,
				mediaProductGrisLayout: payload.mediaProductGrisLayout
			};
		case SET_SELECTED_PRODUCT_IMAGE_ID:
			return {
				...state,
				selectedImageIds: [...state.selectedImageIds, payload.selectedImageId]
			};
		case DELETE_SELECTED_PRODUCT_IMAGE_ID:
			return {
				...state,
				selectedImageIds: removeArrayElementByValue(state.selectedImageIds, payload.selectedImageId)
			};
		case SET_PENDING:
			return {
				...state,
				pending: payload.pending
			};
		default:
			throw new Error();
	}
};
