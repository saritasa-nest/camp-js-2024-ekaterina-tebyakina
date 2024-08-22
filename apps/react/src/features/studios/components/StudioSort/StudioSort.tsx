import { FC, memo, useState } from 'react';
import { BaseSortFields } from '@js-camp/core/models/base-sort-fields';
import { SortDirection } from '@js-camp/core/models/sort-direction';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import useQueryParams from '@js-camp/react/hooks/useQueryParam';
import { SortParamsMapper } from '@js-camp/core/mappers/sort-params.mapper';
import { StudioQueryParams } from '@js-camp/core/mappers/studio-query-params.mapper';

/**
 * Create sort value.
 * @param field Genres query params sort field.
 * @param direction Genres query params sort direction.
 */
function createSortValue(field: BaseSortFields, direction: SortDirection): string {
	const sortValue = SortParamsMapper.toDto({
		sortDirection: direction,
		sortField: field,
	});
	return sortValue ? sortValue : '';
}

const sorts = [
	{ value: '', label: 'Default' },
	{ value: createSortValue(BaseSortFields.Name, SortDirection.Ascending), label: 'Sort by name (A - Z)' },
	{ value: createSortValue(BaseSortFields.Name, SortDirection.Descending), label: 'Sort by name (Z - A)' },
	{ value: createSortValue(BaseSortFields.ModifiedDate, SortDirection.Ascending), label: 'Sort by type (A - Z)' },
	{ value: createSortValue(BaseSortFields.ModifiedDate, SortDirection.Descending), label: 'Sort by type (Z - A)' },
];

/** Genres sort component. */
const StudiosSortComponent: FC = () => {
	const { getQueryParamByKey, setQueryParams } = useQueryParams<StudioQueryParams>();

	const sortOption = getQueryParamByKey('sort');
	const [value, setValue] = useState<string>(sortOption);

	const handleSelecting = (e: SelectChangeEvent<string>) => {
		setValue(e.target.value);
		setQueryParams({
			sort: e.target.value,
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
				{sorts.map(sort => (
					<MenuItem key={sort.value} value={sort.value}>
						{sort.label}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

/** Memoized GenresSortComponent. */
export const StudiosSort = memo(StudiosSortComponent);
