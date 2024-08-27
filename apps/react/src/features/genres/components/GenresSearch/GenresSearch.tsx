import { memo, FC, ChangeEvent } from 'react';
import { TextField } from '@mui/material';
import { useAppDispatch } from '@js-camp/react/store';
import { changeFilters } from '@js-camp/react/store/genre/slice';

import styles from './GenresSearch.module.css';

/** Genres search form. */
const GenresSearchComponent: FC = () => {
	const dispatch = useAppDispatch();
	const handleSearchGenres = (event: ChangeEvent<HTMLInputElement>): void => {
		const {
			target: { value },
		} = event;

		const search = { search: value };
		dispatch(changeFilters(search));
	};

	return (
		<form>
			<TextField
				className={styles.search}
				label="Search"
				variant="outlined"
				onChange={handleSearchGenres}
			/>
		</form>
	);
};

/** Memorized search form. */
export const GenresSearch = memo(GenresSearchComponent);
