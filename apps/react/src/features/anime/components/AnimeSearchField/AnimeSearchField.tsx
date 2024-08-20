import { memo, FC, useState, ChangeEvent } from 'react';
import { TextField } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

/** Anime filter form. */
const AnimeSearchFieldComponent: FC = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [searchTerm, setSearchTerm] = useState(searchParams.get('searchTerm') ?? '');

	/**
	 * Triggers when search term is changed.
	 * @param event - Input event.
	 */
	function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
		setSearchTerm(event.target.value);
		searchParams.set('searchTerm', event.target.value);
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
