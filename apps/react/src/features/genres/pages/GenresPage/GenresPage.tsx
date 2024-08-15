import { memo, useEffect, FC } from 'react';
import { fetchGenres } from '@js-camp/react/store/genre/dispatchers';
import { selectGenres, selectAreGenresLoading } from '@js-camp/react/store/genre/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { GenresList } from '../../components/GenresList';
import { GenresFilterForm } from '../../components/GenresFilterForm';

import styles from './GenresPage.module.css';

/** Genres page component. */
const GenresPageComponent: FC = () => {
	const dispatch = useAppDispatch();
	const genres = useAppSelector(selectGenres);
	const isLoading = useAppSelector(selectAreGenresLoading);

	useEffect(() => {
		dispatch(fetchGenres());
	}, [dispatch]);

	if (isLoading) {
		return <div>Loading</div>;
	}

	return (
		<main className={styles.main}>
			<Box className={styles.list__container}>
				<GenresFilterForm/>
				<Box className={styles.list}>
					<GenresList genres={genres} />
				</Box>
			</Box>
			<Box className={styles.details}>
				<Outlet />
			</Box>
		</main>
	);
};

/**
 * Memorized genres page component.
 */
export const GenresPage = memo(GenresPageComponent);
