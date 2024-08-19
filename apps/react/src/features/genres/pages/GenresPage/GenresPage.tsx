import { memo, useEffect, FC } from 'react';
import { fetchGenres } from '@js-camp/react/store/genre/dispatchers';
import { selectGenres, selectAreGenresLoading } from '@js-camp/react/store/genre/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { Outlet } from 'react-router-dom';

import { GenresFilterForm } from '../../components/GenresFilterForm/GenresFilterForm';
import { GenresList } from '../../components/GenresList/GenresList';

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
			<div className={styles.section}>
				<GenresFilterForm />
				<GenresList genres={genres} />
			</div>
			<div className={styles.details}>
				<Outlet />
			</div>
		</main>
	);
};

/** Memoized genres page component. */
export const GenresPage = memo(GenresPageComponent);
