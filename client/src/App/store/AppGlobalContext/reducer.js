import { actionLogger, getRandomId, removeArrayElement } from '../../../utils';

import {
	SHOW_NOTIFICATION,
	REMOVE_NOTIFICATION
} from './consts';

export const initialState = {
	notifications: []
};

export const reducer = (state, payload) => {
	actionLogger(payload.type);

	switch (payload.type) {
		case SHOW_NOTIFICATION:
			const notification = {
				id: getRandomId(),
				...payload.notification
			};

			return {
				...state,
				notifications: [...state.notifications, notification]
			};
		case REMOVE_NOTIFICATION:
			console.log(removeArrayElement(state.notifications, payload.notificationId));
			return {
				...state,
				notifications: removeArrayElement(state.notifications, payload.notificationId)
			};
		default:
			throw new Error();
	}
};
