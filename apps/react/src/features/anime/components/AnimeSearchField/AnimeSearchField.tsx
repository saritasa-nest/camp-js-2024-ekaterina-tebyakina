import { memo, FC, useState, ChangeEvent } from 'react';
import { TextField } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { QueryParams } from '@js-camp/react/models/queryParams';

/** Anime filter form. */
const AnimeSearchFieldComponent: FC = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [searchTerm, setSearchTerm] = useState(searchParams.get(QueryParams.SearchTerm) ?? '');

	/**
	 * Handles changes to the search term.
	 * @param event - Input event.
	 */
	function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
		setSearchTerm(event.target.value);
		searchParams.set(QueryParams.SearchTerm, event.target.value);
		setSearchParams(searchParams);
	}

	return (
		<TextField
			label="Search"
			variant="outlined"
			value={searchTerm}
			onChange={handleSearchChange}
		/>
	);
};

/** Memoized filter form. */
export const AnimeSearchField = memo(AnimeSearchFieldComponent);
