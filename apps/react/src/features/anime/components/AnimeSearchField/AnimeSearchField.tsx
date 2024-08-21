import { memo, FC, useState, ChangeEvent } from 'react';
import { TextField } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { SEARCH_TERM_QUERY_PARAM } from '@js-camp/react/api/constants';

/** Anime filter form. */
const AnimeSearchFieldComponent: FC = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [searchTerm, setSearchTerm] = useState(searchParams.get(SEARCH_TERM_QUERY_PARAM) ?? '');

	/**
	 * Handles changes to the search term.
	 * @param event - Input event.
	 */
	function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
		setSearchTerm(event.target.value);
		searchParams.set(SEARCH_TERM_QUERY_PARAM, event.target.value);
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
