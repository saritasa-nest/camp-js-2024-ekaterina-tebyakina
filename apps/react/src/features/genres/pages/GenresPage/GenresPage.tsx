import { memo, FC } from 'react';

import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { GenresSidebar } from '../../components/GenresSidebar';

import styles from './GenresPage.module.css';

/** Genres page component. */
const GenresPageComponent: FC = () => (
	<main className={styles.main}>
		<GenresSidebar />
		<Box className={styles.main__details}>
			<Outlet />
		</Box>
	</main>
);

/** Memorized genres page component. */
export const GenresPage = memo(GenresPageComponent);
