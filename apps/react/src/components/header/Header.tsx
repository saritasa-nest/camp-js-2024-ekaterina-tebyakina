import { FC, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { ANIME_PATH } from '@js-camp/react/features/anime/routes';
import { GENRES_PATH } from '@js-camp/react/features/genres/routes';
import { STUDIOS_PATH } from '@js-camp/react/features/studios/routes';

import styles from './Header.module.css';

/** Header component. */
const HeaderComponent: FC = () => {

	const location = useLocation();

	const isCurrentPath = (path: string) => location.pathname.startsWith(path);

	return (
		<AppBar
			position="static"
			className={styles.header}
		>
			<nav className={styles.nav}>
				<h1 className={styles.title}>Anime App</h1>
				<Stack direction="row" spacing={1}>
					<Chip
						label="Anime"
						variant={isCurrentPath(`/${ANIME_PATH}`) ? 'filled' : 'outlined'}
						component={Link}
						to={ANIME_PATH}
						clickable
					/>
					<Chip
						label="Genres"
						variant={isCurrentPath(`/${GENRES_PATH}`) ? 'filled' : 'outlined'}
						component={Link}
						to={GENRES_PATH}
						clickable
					/>
					<Chip
						label="Studios"
						variant={isCurrentPath(`/${STUDIOS_PATH}`) ? 'filled' : 'outlined'}
						component={Link}
						to={STUDIOS_PATH}
						clickable
					/>
				</Stack>
			</nav>
			<span>Authorization menu</span>
		</AppBar>
	);
};

/** Memoized header. */
export const Header = memo(HeaderComponent);
