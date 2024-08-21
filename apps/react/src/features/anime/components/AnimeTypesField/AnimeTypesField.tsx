import { memo, FC, useState } from 'react';
import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
} from '@mui/material';
import { AnimeType } from '@js-camp/core/models/anime-type';
import { useSearchParams } from 'react-router-dom';
import { AnimeTypeMapper } from '@js-camp/core/mappers/anime-type.mapper';
import { SELECTED_TYPES_QUERY_PARAM } from '@js-camp/react/api/constants';

import styles from './AnimeTypesField.module.css';

/** Anime filter form. */
const AnimeTypesFieldComponent: FC = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const [selectedTypes, setSelectedTypes] = useState(
		AnimeTypeMapper.stringToArray(searchParams.get(SELECTED_TYPES_QUERY_PARAM) ?? ''),
	);

	const animeTypes = Object.values(AnimeType);
	const animeTypesHtmlElements = animeTypes.map(type => <MenuItem key={type} value={type}>{type}</MenuItem>);

	/**
	 * Triggers when the list of selected anime types is changed.
	 * @param event - Select change event.
	 */
	const handleTypesChange = (event: SelectChangeEvent<AnimeType[]>) => {
		const { value } = event.target;
		AnimeTypeMapper.assertValueIsAnimeTypeArray(value);
		setSelectedTypes(value);
		searchParams.set(SELECTED_TYPES_QUERY_PARAM, AnimeTypeMapper.arrayToString(value));
		setSearchParams(searchParams);
	};

	return (
		<FormControl className={styles.field}>
			<InputLabel id="type-select-label">Type</InputLabel>
			<Select
				multiple
				labelId="type-select-label"
				id="type-select"
				value={selectedTypes}
				label="Type"
				onChange={handleTypesChange}
			>
				{animeTypesHtmlElements}
			</Select>
		</FormControl>
	);
};

/** Memoized filter form. */
export const AnimeTypesField = memo(AnimeTypesFieldComponent);
