import { FC, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import styles from './Header.module.css';

/** Header component. */
const HeaderComponent: FC = () => {

	const location = useLocation();

	const isActive = (path: string) => location.pathname.startsWith(path);

	return (
		<AppBar
			position="static"
			className={styles.header}
		>
			<nav className={styles.nav}>
				<h1 className={styles.header__title}>Anime App</h1>
				<Stack direction="row" spacing={1}>
					<Chip
						label="Anime"
						variant={isActive('/anime') ? 'filled' : 'outlined'}
						component={Link}
						to="/anime"
						clickable
					/>
					<Chip
						label="Genres"
						variant={isActive('/genres') ? 'filled' : 'outlined'}
						component={Link}
						to="/genres"
						clickable
					/>
					<Chip
						label="Studios"
						variant={isActive('/studios') ? 'filled' : 'outlined'}
						component={Link}
						to="/studios"
						clickable
					/>
				</Stack>
			</nav>
			<Box>Authorization menu</Box>
		</AppBar>
	);
};

/**
 * Memorized header.
 */
export const Header = memo(HeaderComponent);
