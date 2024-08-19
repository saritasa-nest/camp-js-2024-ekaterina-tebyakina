/* eslint-disable */
import { memo, FC, useState, useEffect, ChangeEvent, useMemo } from 'react';
import {
	FormControl,
	InputLabel,
	MenuItem, Select, SelectChangeEvent, TextField, ToggleButton, ToggleButtonGroup,
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { AnimeType } from '@js-camp/core/models/anime-type';
import { useSearchParams } from 'react-router-dom';
import { AnimeTypeMapper } from '@js-camp/core/mappers/anime-type.mapper';
import { AnimeSort } from '@js-camp/react/models/animeSort';

import styles from './AnimeFilterForm.module.css';
import { fetchList } from '@js-camp/react/store/anime/dispatchers';
import { useAppDispatch } from '@js-camp/react/store/store';
import { checkIsEnumMember } from '@js-camp/core/utils/check-is-enum.util';

/** Anime filter form. */
const AnimeFilterFormComponent: FC = () => {

	const dispatch = useAppDispatch();

	const [searchParams, setSearchParams] = useSearchParams();

	/**
	 * Assert that value is typeof AnimeColumnsIndexes.
	 * @param value - Value for checking.
	 */
	function assertIsAnimeSort(value: unknown): asserts value is AnimeSort {
		if (!checkIsEnumMember(value, AnimeSort)) {
			throw new Error(`${value} is not a valid AnimeSort!`);
		}
	}

	const [searchTerm, setSearchTerm] = useState(searchParams.get('searchTerm') ?? '');

	const sortingSettingsQueryParam = searchParams.get('sortingSettings') ?? '';
	assertIsAnimeSort(sortingSettingsQueryParam);
	const [sortingSettings, setSortingSetting] = useState(sortingSettingsQueryParam ?? AnimeSort.None);

	const typesQueryParam = searchParams.get('selectedTypes') ?? '';
	const [selectedTypes, setSelectedTypes] = useState(
		typesQueryParam ? AnimeTypeMapper.stringToArray(typesQueryParam) : [],
	);

	const animeTypes = Object.values(AnimeType);
	const selectItems = animeTypes.map(type => <MenuItem key={type} value={type}>{type}</MenuItem>);

	const handleTypesChange = (event: SelectChangeEvent<AnimeType[]>) => {
		const { value } = event.target;

		if (typeof value === 'string') {
			AnimeTypeMapper.assertIsAnimeType(value);
			setSelectedTypes([value]);
			searchParams.set('selectedTypes', value);
			dispatch(fetchList({
				searchTerm,
				selectedTypes: [value],
				sortingSettings,
			}));
			return;
		}
		setSelectedTypes(value);
		searchParams.set('selectedTypes', AnimeTypeMapper.arrayToString(value));

		setSearchParams(searchParams);
		dispatch(fetchList({
			searchTerm,
			selectedTypes: value,
			sortingSettings,
		}));
	};

	const handleSortChange = (
		event: React.MouseEvent<HTMLElement>,
		newSortingSettings: AnimeSort | null,
	) => {
		setSortingSetting(newSortingSettings ? newSortingSettings : AnimeSort.None);
		searchParams.set('sortingSettings', newSortingSettings ? newSortingSettings : AnimeSort.None);
		setSearchParams(searchParams);
		dispatch(fetchList({
			searchTerm,
			selectedTypes,
			sortingSettings: newSortingSettings ? newSortingSettings : AnimeSort.None,
		}));
	};

	/**
	 * HandleSearchChange.
	 * @param event HandleSearchChange.
	 */
	function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
		setSearchTerm(event.target.value);
		searchParams.set('searchTerm', event.target.value);
		setSearchParams(searchParams);
		dispatch(fetchList({
			searchTerm: event.target.value,
			selectedTypes,
			sortingSettings,
		}));
	}

	return (
		<form className={styles.form}>
			<div className={styles['form-row']}>
				<TextField
					className={styles.form__field}
					label="Search"
					variant="outlined"
					value={searchTerm}
					onChange={handleSearchChange}
				/>
				<FormControl className={styles.form__field}>
					<InputLabel id="type-select-label">Type</InputLabel>
					<Select
						multiple
						labelId="type-select-label"
						id="type-select"
						value={selectedTypes}
						label="Type"
						onChange={handleTypesChange}
					>
						{selectItems}
					</Select>
				</FormControl>
			</div>
			<div className={styles['form-row']}>
				<ToggleButtonGroup
					size="small"
					value={sortingSettings}
					onChange={handleSortChange}
					exclusive={true}
				>
					<ToggleButton
						value={AnimeSort.AscendingEnglishTitle}
						key={AnimeSort.AscendingEnglishTitle}
						className={styles['sort-button']}
					>
						English title
						<ArrowUpwardIcon />
					</ToggleButton>,
					<ToggleButton
						value={AnimeSort.DescendingEnglishTitle}
						key={AnimeSort.DescendingEnglishTitle}
						className={styles['sort-button']}
					>
						English title
						<ArrowDownwardIcon />
					</ToggleButton>
					<ToggleButton
						value={AnimeSort.AscendingStatus}
						key={AnimeSort.AscendingStatus}
						className={styles['sort-button']}
					>
						Status
						<ArrowUpwardIcon />
					</ToggleButton>,
					<ToggleButton
						value={AnimeSort.DescendingStatus}
						key={AnimeSort.DescendingStatus}
						className={styles['sort-button']}
					>
						Status
						<ArrowDownwardIcon />
					</ToggleButton>
				</ToggleButtonGroup>
			</div>
		</form>
	);
};

/** Memorized filter form. */
export const AnimeFilterForm = memo(AnimeFilterFormComponent);
