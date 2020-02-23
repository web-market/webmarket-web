import {
	getFilters as getFiltersAPI,
	addFilter as addFilterAPI
} from '../api';

import {
	SET_FILTERS,
	SET_PENDING
} from './consts';

export default (dispatch) => {
	const setPending = (pending) => {
		dispatch({
			type: SET_PENDING,
			pending
		});
	};

	const setFilters = (filters) => {
		dispatch({
			type: SET_FILTERS,
			filters
		});
	};

	const getFiltersList = () => {
		setPending(true);

		return getFiltersAPI()
			.then(({ data }) => setFilters(data))
			.catch(e => console.log(e))
			.finally(() => setPending(false));
	};

	const addFilter = (data) => {
		setPending(true);

		return addFilterAPI(data)
			.then(() => getFiltersList())
			.catch(e => console.log(e))
			.finally(() => setPending(false));
	};

	return {
		addFilter,
		getFiltersList
	};
};
