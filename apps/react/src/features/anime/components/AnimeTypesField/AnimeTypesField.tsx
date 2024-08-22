import { memo, FC, useState, useId } from 'react';
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
import { QueryParams } from '@js-camp/react/models/queryParams';

import styles from './AnimeTypesField.module.css';

const animeTypes = Object.values(AnimeType);

/** Anime filter form. */
const AnimeTypesFieldComponent: FC = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const [selectedTypes, setSelectedTypes] = useState(
		AnimeTypeMapper.stringToArray(searchParams.get(QueryParams.SelectedTypes) ?? ''),
	);

	const animeTypesHtmlElements = animeTypes.map(type => <MenuItem key={type} value={type}>{type}</MenuItem>);

	const inputLabelId = useId();

	/**
	 * Handles changes to the selected anime types.
	 * @param event - Select change event.
	 */
	const handleTypesChange = (event: SelectChangeEvent<AnimeType[]>) => {
		const { value } = event.target;
		AnimeTypeMapper.assertValueIsAnimeTypeArray(value);
		setSelectedTypes(value);
		searchParams.set(QueryParams.SelectedTypes, value.toString());
		setSearchParams(searchParams);
	};

	return (
		<FormControl className={styles.field}>
			<InputLabel id={inputLabelId}>Type</InputLabel>
			<Select
				multiple
				labelId={inputLabelId}
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
