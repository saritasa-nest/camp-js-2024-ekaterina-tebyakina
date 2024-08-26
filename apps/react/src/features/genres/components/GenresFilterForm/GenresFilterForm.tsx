import { memo, FC, ChangeEvent } from 'react';
import { TextField } from '@mui/material';
import { useAppDispatch } from '@js-camp/react/store';
import { changeFilters } from '@js-camp/react/store/genre/slice';

import styles from './GenresFilterForm.module.css';

/** Genres filter form. */
const GenresFilterFormComponent: FC = () => {
	const dispatch = useAppDispatch();
	const handleSearchGenres = (event: ChangeEvent<HTMLInputElement>): void => {
		const search = { search: event.target.value };
		dispatch(changeFilters(search));
	};

	return (
		<form className={styles.form}>
			<TextField
				className={styles.form__field}
				label="Search"
				variant="outlined"
				onChange={handleSearchGenres}
			/>
		</form>
	);
};

/** Memorized filter form. */
export const GenresFilterForm = memo(GenresFilterFormComponent);
