import { memo, FC } from 'react';

import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { GenresList } from '../../components/GenresList';
import { GenresFilterForm } from '../../components/GenresFilterForm';

import styles from './GenresPage.module.css';

/** Genres page component. */
const GenresPageComponent: FC = () => (
	<main className={styles.main}>
		<Box className={styles.main__section}>
			<GenresFilterForm />
			<GenresList />
		</Box>
		<Box className={styles.main__details}>
			<Outlet />
		</Box>
	</main>
);

/** Memorized genres page component. */
export const GenresPage = memo(GenresPageComponent);
