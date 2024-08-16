import { FC, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { PATH_TO_ANIME } from '@js-camp/react/features/anime/routes';
import { PATH_TO_GENRES } from '@js-camp/react/features/genres/routes';
import { PATH_TO_STUDIOS } from '@js-camp/react/features/studios/routes';

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
			<nav className={styles.header__nav}>
				<h1 className={styles.header__title}>Anime App</h1>
				<Stack direction="row" spacing={1}>
					<Chip
						label="Anime"
						variant={isCurrentPath(`/${PATH_TO_ANIME}`) ? 'filled' : 'outlined'}
						component={Link}
						to={PATH_TO_ANIME}
						clickable
					/>
					<Chip
						label="Genres"
						variant={isCurrentPath(`/${PATH_TO_GENRES}`) ? 'filled' : 'outlined'}
						component={Link}
						to={PATH_TO_GENRES}
						clickable
					/>
					<Chip
						label="Studios"
						variant={isCurrentPath(`/${PATH_TO_STUDIOS}`) ? 'filled' : 'outlined'}
						component={Link}
						to={PATH_TO_STUDIOS}
						clickable
					/>
				</Stack>
			</nav>
			<span>Authorization menu</span>
		</AppBar>
	);
};

/** Memorized header. */
export const Header = memo(HeaderComponent);
