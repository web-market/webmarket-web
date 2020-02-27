import React from 'react';

import FiltersContextProvider from './store';
import FiltersModalsProvider from './components/FiltersModalsProvider';


import AdminControlHeader from '../../components/AdminControlHeader';
import GridLayout, { GridLayoutRow } from '../../baseComponents/GridLayout';
import FiltersList from './components/FiltersList';
import FiltersAddFiltersGroup from './components/FiltersAddFiltersGroup';

const Filters = () => {
	return (
		<>
			<AdminControlHeader
				label="!!!Фильтры"
			/>
			<FiltersContextProvider>
				<FiltersModalsProvider>
					<GridLayout>
						<GridLayoutRow
							grid="7-5"
						>
							<FiltersList />
							<FiltersAddFiltersGroup />
						</GridLayoutRow>
					</GridLayout>
				</FiltersModalsProvider>
			</FiltersContextProvider>
		</>
	);
};
export { Filters };