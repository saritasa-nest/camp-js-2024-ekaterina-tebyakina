import { memo, FC } from 'react';
import { Outlet } from 'react-router-dom';

import { AnimeFilterForm } from '../components/AnimeFilterForm/AnimeFilterForm';
import { AnimeList } from '../components/AnimeList/AnimeList';

import styles from './AnimePage.module.css';

/** Anime page component. */
const AnimePageComponent: FC = () => (
	<main className={styles.main}>
		<div className={styles.section}>
			<AnimeFilterForm />
			<AnimeList />
		</div>
		<div className={styles.details}>
			<Outlet />
		</div>
	</main>
);

/** Memoized anime page component. */
export const AnimePage = memo(AnimePageComponent);
