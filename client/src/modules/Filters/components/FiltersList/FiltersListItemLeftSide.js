import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import Tooltip from '../../../../baseComponents/Tooltip';
import classes from './styles/index.scss';
import Icon from '../../../../baseComponents/Icon';
import { exclamation } from '../../../../icons';

const FiltersListItemLeftSide = (
	{
		name,
		displayName
	}
) => {
	const displayNameValue = useMemo(() => {
		return (
			<>
				<span className={classes.filtersListItem_displayName_separator}>|</span>
				{displayName}
				<Icon
					icon={exclamation}
					className={classes.filtersListItem_displayName_iconClassName}
				/>
			</>
		);
	}, [displayName]);

	return (
		<div className={classes.filtersListItem_left}>
			{name}
			<div className={classes.filtersListItem_displayName}>
				<Tooltip
					tooltip={displayNameValue}
					message="Имя фильтра в магазине"
				/>
			</div>
		</div>
	);
};

FiltersListItemLeftSide.propTypes = {
	name: PropTypes.string,
	displayName: PropTypes.string
};

export default FiltersListItemLeftSide;