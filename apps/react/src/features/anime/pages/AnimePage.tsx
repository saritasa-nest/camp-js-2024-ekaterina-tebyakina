import { memo, FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { selectAnimeList, selectAnimeListLoading } from '@js-camp/react/store/anime/selectors';
import { fetchList } from '@js-camp/react/store/anime/dispatchers';
import { Outlet } from 'react-router-dom';

import { AnimeSort } from '@js-camp/react/models/animeSort';

import { AnimeList } from '../components/AnimeList';
import { AnimeFilterForm } from '../components/AnimeFilterForm';

import styles from './AnimePage.module.css';

/** Anime page component. */
const AnimePageComponent: FC = () => {
	const dispatch = useAppDispatch();
	const animeList = useAppSelector(selectAnimeList);
	const isLoading = useAppSelector(selectAnimeListLoading);

	useEffect(() => {
		dispatch(fetchList({
			searchTerm: '',
			selectedTypes: [],
			sortingSettings: AnimeSort.None,
		}));
	}, [dispatch]);

	if (isLoading) {
		return <div>Loading</div>;
	}

	return (
		<main className={styles.main}>
			<div className={styles.main__section}>
				<AnimeFilterForm />
				<AnimeList animeList={animeList} />
			</div>
			<div className={styles.main__details}>
				<Outlet />
			</div>
		</main>
	);
};

/** Memorized anime page component. */
export const AnimePage = memo(AnimePageComponent);
