import { FC, memo, useState } from 'react';
import { BaseSortFields } from '@js-camp/core/models/base-sort-fields';
import { SortDirection } from '@js-camp/core/models/sort-direction';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import useQueryParams from '@js-camp/react/hooks/useQueryParam';
import { SortParamsMapper } from '@js-camp/core/mappers/sort-params.mapper';
import { StudioQueryParams } from '@js-camp/core/mappers/studio-query-params.mapper';
import { useAppSelector } from '@js-camp/react/store';
import { selectAreStudiosLoading } from '@js-camp/react/store/studio/selectors';

/** Sort option type. */
type SortOption = {

	/** Label. */
	label: string;

	/** Value. */
	value: string;
};

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
	return sortValue ?? '';
}

const sorts: SortOption[] = [
	{ label: 'Default', value: '' },
	{ label: 'Alphabetical (A - Z)', value: createSortValue(BaseSortFields.Name, SortDirection.Ascending) },
	{ label: 'Alphabetical (Z - A)', value: createSortValue(BaseSortFields.Name, SortDirection.Descending) },
	{ label: 'Most Recent Updates', value: createSortValue(BaseSortFields.ModifiedDate, SortDirection.Ascending) },
	{ label: 'Least Recent Updates', value: createSortValue(BaseSortFields.ModifiedDate, SortDirection.Descending) },
];

/** Genres sort component. */
const StudiosSortComponent: FC = () => {
	const { getQueryParamByKey, setQueryParams } = useQueryParams<StudioQueryParams>();
	const isLoading = useAppSelector(selectAreStudiosLoading);

	const sortOption = getQueryParamByKey('sort');
	const [value, setValue] = useState<string>(sortOption);

	/**
	 * Handle actions when selecting an option.
	 * @param e SelectChangeEvent.
	 */
	function handleSelecting(e: SelectChangeEvent<string>) {
		setValue(e.target.value);
		setQueryParams({
			sort: e.target.value,
		});
	}

	return (
		<FormControl
			fullWidth
			disabled={isLoading}
		>
			<InputLabel id='studio-sort'>Sort By</InputLabel>
			<Select
				labelId='studio-sort'
				id='demo-simple-select'
				value={value}
				label='Sort By'
				onChange={handleSelecting}
			>
				{sorts.map(sort => (
					<MenuItem
						key={sort.value}
						value={sort.value}
					>
						{sort.label}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

/** Memoized StudiosSortComponent. */
export const StudiosSort = memo(StudiosSortComponent);
