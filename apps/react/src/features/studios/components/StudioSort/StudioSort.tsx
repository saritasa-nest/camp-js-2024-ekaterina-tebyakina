import { FC, memo, useState } from 'react';
import { StudioQueryParams } from '@js-camp/core/mappers/studio-query-params.mapper';
import { BaseSortFields } from '@js-camp/core/models/base-sort-fields';
import { SortDirection } from '@js-camp/core/models/sort-direction';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import useQueryParams from '@js-camp/react/hooks/useQueryParam';
import { StudioFilterParams } from '@js-camp/core/models/studio-filter-params';

/**
 * Create sort value.
 * @param field Genres query params sort field.
 * @param direction Genres query params sort direction.
 */
function createSortValue(
	field: StudioQueryParams['sortField'],
	direction: StudioQueryParams['sortDirection'],
): StudioFilterParams.Sort | null {
	if (field && direction) {
		return {
			sortDirection: direction,
			sortField: field,
		};
	}
	return null;
}

const sorts = [
	{ value: null, label: 'Default' },
	{ value: createSortValue(BaseSortFields.Name, SortDirection.Ascending), label: 'Sort by name (A - Z)' },
	{ value: createSortValue(BaseSortFields.Name, SortDirection.Descending), label: 'Sort by name (Z - A)' },
	{ value: createSortValue(BaseSortFields.ModifiedDate, SortDirection.Ascending), label: 'Sort by type (A - Z)' },
	{ value: createSortValue(BaseSortFields.ModifiedDate, SortDirection.Descending), label: 'Sort by type (Z - A)' },
];

/** Genres sort component. */
const StudiosSortComponent: FC = () => {
	const { getQueryParamByKey, setQueryParams } = useQueryParams<StudioQueryParams>();
	const sortField = getQueryParamByKey('sortField');
	const sortDirection = getQueryParamByKey('sortDirection');

	const chosenOption = sorts.filter(
		sort => sort.value?.sortDirection === sortDirection && sort.value.sortField === sortField,
	);
	const [value, setValue] = useState<string>(chosenOption.length > 0 ? chosenOption[0].label : '');

	const handleSelecting = (e: SelectChangeEvent<string>) => {
		setValue(e.target.value);
		const sortOption = sorts.filter(sort => sort.label === e.target.value);
		setQueryParams({
			sortDirection: sortOption[0].value?.sortDirection,
			sortField: sortOption[0].value?.sortField,
		});
	};

	return (
		<FormControl fullWidth>
			<InputLabel id="demo-simple-select-label">Sort By</InputLabel>
			<Select
				labelId="demo-simple-select-label"
				id="demo-simple-select"
				value={value}
				label="Sort By"
				onChange={handleSelecting}
			>
				{sorts.map(sortOption => (
					<MenuItem key={sortOption.label} value={sortOption.label}>
						{sortOption.label}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

/** Memoized GenresSortComponent. */
export const StudiosSort = memo(StudiosSortComponent);
